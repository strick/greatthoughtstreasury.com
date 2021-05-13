var express = require('express');
var controller = require('../controllers/topic');
var router = express.Router();


router.route('/').get(controller.listAll);
router.route('/:id').get(controller.getById);

module.exports = router;
