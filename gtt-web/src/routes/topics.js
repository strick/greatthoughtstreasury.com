var express = require('express');
var cache = require('../middleware/cache');
var controller = require('../controllers/topic');
var router = express.Router();


router.route('/').get(cache(), controller.listAllPage);
router.route('/:page').get(cache(), controller.listAll);
router.route('/single/:id').get(cache(), controller.getById);
router.route('/single/:id/:page').get(cache(), controller.getByIdPage);

module.exports = router;
