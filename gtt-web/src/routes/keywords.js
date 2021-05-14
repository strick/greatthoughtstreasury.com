var express = require('express');
var controller = require('../controllers/keyword');
var router = express.Router();

router.route('/').get(controller.listAllPage);
router.route('/:page').get(controller.listAll);
router.route('/single/:id').get(controller.getById);
router.route('/single/:id/:page').get(controller.getByIdPage);

module.exports = router;
