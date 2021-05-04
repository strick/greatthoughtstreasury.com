var express = require('express');
var controller = require('../controllers/author');
var router = express.Router();


router.route('/').get(controller.listAll);
router.route('/:id').get(controller.listAll);

module.exports = router;
