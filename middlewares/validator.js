
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const model = require('../models/connections')
var curdate =  new Date().toJSON().slice(0, 10);


exports.validateId = (req, res, next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        let err = new Error('Invalid story id');
        err.status = 400;
        return next(err);
    } else {
        return next();
    }
};

exports.validateSignUp = [body('firstName', 'First name cannot be empty').notEmpty().trim().escape(),
body('lastName', 'Last name cannot be empty').notEmpty().trim().escape(),
body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({ min: 8, max: 64 })];

exports.validateLogIn = [body('email', 'Email must be a valid email address').isEmail().trim().escape().normalizeEmail(),
body('password', 'Password must be atleast 8 characters and at most 64 characters').isLength({ min: 8, max: 64 })];


exports.validateStory = [body('connectionName', 'Name must be 3 or more characters').isLength({ min: 3 }).trim().escape(),
body('connectionTopic', 'Topic must be 3 or more characters').isLength({ min: 3 }).trim().escape(),
body('details', 'Details must be 10 or more characters').isLength({ min: 10 }).trim().escape(),
body('imageurl', 'Image URL cannot be empty').notEmpty().trim().escape(),
];


exports.validateResult = (req, res, next) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg);
        });
        return res.redirect('back');
    } else {
        return next();
    }
}

exports.isValidtrade = (req, res, next) => {
    let status = req.body.status;
    if (status == null) {
        req.flash('error', 'Item Details cannot be empty');
        res.redirect('/');
    }
    else {
        status = req.body.status.toUpperCase();
        if (status == 'YES' || status == 'NO' || status == 'MAYBE') {
            next();
        } else {
            req.flash('error', 'Error');
            res.redirect('/');
        }
    }
};

exports.isUserConnection = (req, res, next) => {
    model.findById(req.params.id)
        .then(connection => {
            if (connection.author._id == req.session.user._id) {
                req.flash('error', 'Cannot get your own Item');
                res.redirect('/');
            }
            else {
                next();
            }
        })
        .catch(err => next(err));
};


