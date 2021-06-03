var express = require('express');
var cache = require('../middleware/cache');
var controller = require('../controllers/author');
var router = express.Router();

router.route('/').get(cache(), controller.listAllPage);
router.route('/:page').get(cache(), controller.listAll);
router.route('/single/:id').get(cache(), controller.getByNid);
router.route('/single/:id/:page').get(cache(), controller.getByNidPage);

module.exports = router;