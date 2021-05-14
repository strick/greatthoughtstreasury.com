var express = require('express');
var controller = require('../controllers/topic');
var router = express.Router();


router.route('/').get(controller.listAllPage);
router.route('/:page').get(controller.listAll);
router.route('/single/:id').get(controller.getById);

module.exports = router;
