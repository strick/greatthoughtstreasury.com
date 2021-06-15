var express = require('express');
var cache = require('../middleware/cache');
var controller = require('../controllers/topic');
var router = express.Router();

router.route('/:slug').get(cache(), controller.getBySlug);

module.exports = router;
