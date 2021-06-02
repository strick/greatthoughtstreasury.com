var express = require('express');
var controller = require('../controllers/quote');
var router = express.Router();


router.route('/').get(controller.listAllPage);
router.route('/:page').get(controller.listAll);
router.route('/single/:id').get(controller.getByNid);
router.route('/related/:id').get(controller.related);
router.route('/related/:id/:page').get(controller.related);

module.exports = router;
