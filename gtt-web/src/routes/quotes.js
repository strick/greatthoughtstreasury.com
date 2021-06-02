var express = require('express');
var controller = require('../controllers/quote');
var cache = require('../middleware/cache');
var router = express.Router();


router.route('/').get(cache(), controller.listAllPage);
router.route('/:page').get(cache(), controller.listAll);
router.route('/single/:id').get(cache(), controller.getByNid);
router.route('/related/:id').get(cache(), controller.related);
router.route('/related/:id/:page').get(cache(), controller.related);

module.exports = router;
