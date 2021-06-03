var express = require('express');
var cache = require('../middleware/cache');
var controller = require('../controllers/author');
var router = express.Router();

router.route('/').get(cache.route(), controller.listAllPage);
router.route('/:page').get(cache.route(), controller.listAll);
router.route('/single/:id').get(cache.route(), controller.getByNid);
router.route('/single/:id/:page').get(cache.route(), controller.getByNidPage);

module.exports = router;
