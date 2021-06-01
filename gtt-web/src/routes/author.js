var express = require('express');
var controller = require('../controllers/author');
var router = express.Router();

router.route('/:slug').get(controller.getByNid);

module.exports = router;
