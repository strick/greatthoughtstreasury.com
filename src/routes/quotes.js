var express = require('express');
var controller = require('../controllers/quote');
var cache = require('../middleware/cache');
var handleErrors = require('../middleware/errorHandler');
var router = express.Router();

  /*
router.route('/').get(controller.listAllPage);
router.route('/:page').get(controller.listAll);
router.route('/single/:id').get(controller.getByNid);
router.route('/related/:id').get(controller.related);
router.route('/related/:id/:page').get(controller.related);
*/
router.route('/').get(cache(), controller.listAllPage);
router.route('/:page').get(cache(), controller.listAll);
router.route('/single/:id').get(cache(), controller.getByNid);
router.route('/related/:id').get(cache(), controller.related);
router.route('/related/:id/:page').get(cache(), controller.related);

module.exports = router;