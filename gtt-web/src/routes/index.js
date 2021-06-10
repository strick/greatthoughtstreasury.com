var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Great Thoughts Treasury' });
});

router.get('/.well-known/acme-challenge/7ib971QHCS8piOHN4NGeCYO2Y_HLARPTaLV8mb1969M', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.send("7ib971QHCS8piOHN4NGeCYO2Y_HLARPTaLV8mb1969M.3DCjAQOmsihzQajSyJD7dF2ol_wTVzRfSeX4NV4p26U");
});

http://greatthoughtstreasury.com/.well-known/acme-challenge/umDtPtH6w7ySKyL8-JjD7vN5_yoUje4iJABNZlvRFJk
router.get('/.well-known/acme-challenge/sc3xnPTPPBhkPGYPcUFr6HwqPkleNcCtQR04jxq83Z0', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
  res.send("sc3xnPTPPBhkPGYPcUFr6HwqPkleNcCtQR04jxq83Z0.3DCjAQOmsihzQajSyJD7dF2ol_wTVzRfSeX4NV4p26U");
});

module.exports = router;
