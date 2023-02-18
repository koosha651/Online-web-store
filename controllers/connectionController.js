const model = require('../models/connections');
const { isEmpty } = require('lodash');

const trade = require('../models/trade');
const user = require('../models/user');




exports.connections = (req, res, next) => {

    model.find().then(connections => {
        let groups = allConnectionsGroupByName(connections);
        res.render('./story/connections', { groups });
    })
        .catch(err => next(err));
};

function allConnectionsGroupByName(connections) {
    let allConnections = connections.reduce((r, a) => {
        r[a.connectionName] = [...r[a.connectionName] || [], a];
        return r;
    }, {});
    if (!isEmpty(allConnections))
        return allConnections;
    else return false;
}

exports.show = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 404;
        return next(err);
    }
    model.findById(id).populate('author', 'firstName lastName')
        .then(connection => {
            if (connection) {

                // connection = ChangeConnectionTimeStamp(connection);
                let tradeSize = 0;
                trade.find({ connectionId: req.params.id, status: "YES" })
                    .then(tradeConnections => {
                        if (tradeConnections) tradeSize = tradeConnections.length;
                        res.render('./story/connection', { connection, tradeSize });

                    })
                    .catch(err => next(err));
            } else {
                let err = new Error('Cannot find a Item with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};


exports.create = (req, res, next) => {
    let item = model(req.body);
    item.author = req.session.user._id;
    item.save().then(() => {
        req.flash('success', 'Item has been created successfully');
        res.redirect('/connections');
    }).catch(err => {
        if (err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('back');
        }
    });
};

exports.newConnection = (req, res) => {
    res.render('./story/newConnection');
}

exports.update = (req, res) => {
    let id = req.params.id;
    let connection = req.body;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    // when new topic is added the connection is not creating a separate row for it.
    // need to implement it 
    model.findByIdAndUpdate(id, connection, { useFindAndModify: false, runValidators: false })
        .then((connection) => {

            if (connection) {
                res.redirect('/connections/' + id);
            } else {
                let err = new Error('Cannot find the updated Item  details ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => {
            if (err.name === 'ValidationError')
                err.status = 400;
            next(err);
        });
}

exports.editConnection = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid Item id');
        err.status = 400;
        return next(err);
    }

    model.findById(id)
        .then((connection) => {
            if (connection) {
                return res.render('./story/update', {
                    connection
                });
            } else {
                let err = new Error('Cannot find a item with ID ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
}

exports.deleteConnection = (req, res, next) => {
    let id = req.params.id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid connection id');
        err.status = 400;
        return next(err);
    }
    model.findByIdAndDelete(id, {
        useFindAndModify: false
    })
        .then(connection => {
            if (connection) {
                res.redirect('/connections');
            } else {
                let err = new Error('Cannot delete the Item details : ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err))
}

exports.createtrade = (req, res, next) => {
    let status = req.body.status.toUpperCase();
    trade.find({ connectionId: req.params.id, userID: req.session.user })
        .then(tradeInfo => {
            if (tradeInfo.length == 1) {
                tradeInfo[0].status = status;
                trade.findByIdAndUpdate(tradeInfo[0]._id, tradeInfo[0], { useFindAndModify: false, runValidators: false })
                    .then(tradeObj => {
                        if (tradeObj) {
                            req.flash('success', 'Successfully updated Item');
                            res.redirect('/profile');
                        }
                        else {
                            let err = new Error("Unable to update Item");
                            err.status = 404;
                            next(err);
                        }
                    })
                    .catch(err => next(err));
            }
            else {
                let tradeObj = new trade();
                tradeObj.status = status;
                tradeObj.userID = req.session.user;
                tradeObj.connectionId = req.params.id;
                tradeObj.save()
                    .then(tradeInfo => {
                        req.flash('success', 'Successfully created Item');
                        res.redirect('/profile');
                    })
                    .catch(err => next(err));
            }
        })
        .catch(err => next(err));
};

exports.deletetrade = (req, res, next) => {
    trade.deleteOne({ tournamentID: req.params.id, userID: req.session.user })
        .then(tradeInfo => {
            if (tradeInfo) {
                req.flash("success", "Item Deleted");
                res.redirect("/profile");
            }
        })
        .catch(err => next(err));
}