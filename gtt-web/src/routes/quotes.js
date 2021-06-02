var express = require('express');
var cache = require('../middleware/cache');
var controller = require('../controllers/quote');
var router = express.Router();


router.route('/').get(cache(), controller.listAllPages);
router.route('/:page').get(cache(), controller.listAll);
router.route('/single/:id').get(cache(), controller.getByNid);
router.route('/related/:id').get(cache(), controller.related);
router.route('/related/:id/:page').get(cache(), controller.related);

module.exports = router;
