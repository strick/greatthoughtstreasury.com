var express = require('express');
var controller = require('../controllers/search');
var router = express.Router();

router.route('/').post(controller.search);

module.exports = router;
