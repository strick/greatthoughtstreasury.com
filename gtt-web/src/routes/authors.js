var express = require('express');
var controller = require('../controllers/author');
var router = express.Router();


router.route('/test').get(controller.test);
router.route('/').get(controller.listAll);
router.route('/:id').get(controller.getByNid);

module.exports = router;
