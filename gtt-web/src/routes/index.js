var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Great Thoughts Treasury' });
});

router.get('/.well-known/acme-challenge/umDtPtH6w7ySKyL8-JjD7vN5_yoUje4iJABNZlvRFJk.3DCjAQOmsihzQajSyJD7dF2ol_wTVzRfSeX4NV4p26U', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.send("umDtPtH6w7ySKyL8-JjD7vN5_yoUje4iJABNZlvRFJk.3DCjAQOmsihzQajSyJD7dF2ol_wTVzRfSeX4NV4p26U");
});

router.get('/.well-known/acme-challenge/tHXmQpThj_1BmFfOhTaQKDqIpDMkrtsbdhQujb2mSUk.3DCjAQOmsihzQajSyJD7dF2ol_wTVzRfSeX4NV4p26U', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.send("tHXmQpThj_1BmFfOhTaQKDqIpDMkrtsbdhQujb2mSUk.3DCjAQOmsihzQajSyJD7dF2ol_wTVzRfSeX4NV4p26U");
});

module.exports = router;
