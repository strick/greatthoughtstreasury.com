var express = require('express');
var controller = require('../controllers/author');
var router = express.Router();


router.route('/test').get(controller.test);
router.route('/').get(controller.listAllPage);
router.route('/:page').get(controller.listAll);
router.route('/single/:id').get(controller.getByNid);
router.route('/single/:id/:page').get(controller.getByNidPage);

module.exports = router;
