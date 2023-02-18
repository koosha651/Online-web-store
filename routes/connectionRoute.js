const express = require('express');
const controller = require('../controllers/connectionController');
const { isLoggedIn, isAuthor } = require('../middlewares/auth');
const { validateId, isUserConnection } = require('../middlewares/validator');
const { validateStory, validationResult, validateResult, isValidtrade } = require('../middlewares/validator');

const router = express.Router();

router.get('/connections', controller.connections);

router.get('/connections/:id', validateId,controller.show);

router.post('/connection', isLoggedIn, validateStory, controller.create);

router.get('/newItem', isLoggedIn, controller.newConnection);

router.put('/connections/:id', validateId, isLoggedIn, isAuthor, validateStory, controller.update);

router.get('/connections/:id/edit', validateId, isLoggedIn, isAuthor, validateStory, controller.editConnection);

router.delete('/connections/delete/:id', validateId, isLoggedIn, isAuthor, controller.deleteConnection);

router.post('/connections/:id/trade', validateId, isLoggedIn, isValidtrade, isUserConnection, controller.createtrade)

router.post('/connections/:id/tradeDelete', validateId, isLoggedIn, controller.deletetrade)



module.exports = router;