var express = require('express');
var controller = require('../controllers/quote');
var router = express.Router();


router.route('/').get(controller.listAll);
router.route('/:id').get(controller.getByNid);

module.exports = router;
