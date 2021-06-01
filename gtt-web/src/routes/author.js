var express = require('express');
var controller = require('../controllers/author');
var router = express.Router();

router.route('/:slug').get(controller.getBySlug);

module.exports = router;
