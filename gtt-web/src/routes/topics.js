var express = require('express');
var cache = require('../middleware/cache');
var controller = require('../controllers/topic');
var router = express.Router();

router.route('/').get(controller.listAllPage);
router.route('/:page').get(controller.listAll);
router.route('/single/:id').get(controller.getById);
router.route('/single/:id/:page').get(controller.getByIdPage);

module.exports = router;
