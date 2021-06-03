var express = require('express');
var cache = require('../middleware/cache');
var controller = require('../controllers/topic');
var router = express.Router();


router.route('/').get(cache.route(), controller.listAllPage);
router.route('/:page').get(cache.route(), controller.listAll);
router.route('/single/:id').get(cache.route(), controller.getById);
router.route('/single/:id/:page').get(cache.route(), controller.getByIdPage);

module.exports = router;
