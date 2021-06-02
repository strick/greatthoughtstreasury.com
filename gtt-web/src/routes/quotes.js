var express = require('express');
var controller = require('../controllers/quote');
var cache = require('../middleware/cache');
var router = express.Router();

// Cache Setup
var cache = require("express-redis-cache")({
    host: process.env.REDISCACHEHOSTNAME, 
    port: process.env.REDISCACHEPORT,
    auth_pass: process.env.REDISCACHEKEY
  });

router.route('/').get(controller.listAllPage);
router.route('/:page').get(controller.listAll);
router.route('/single/:id').get(controller.getByNid);
router.route('/related/:id').get(controller.related);
router.route('/related/:id/:page').get(controller.related);
/*
router.route('/').get(cache.route(), controller.listAllPage);
router.route('/:page').get(cache.route(), controller.listAll);
router.route('/single/:id').get(cache.route(), controller.getByNid);
router.route('/related/:id').get(cache.route(), controller.related);
router.route('/related/:id/:page').get(cache.route(), controller.related);
*/
module.exports = router;