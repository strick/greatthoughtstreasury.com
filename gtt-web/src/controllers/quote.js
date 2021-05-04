var Quote = require('../models/Quote');
var db = require('../db');

module.exports = {
    
    listAll: function (req, res, next) {
        db.connect();
        Quote.find({}, function (err, quotes) {
            if (err)
                return next(err);
            db.close();
             
            res.render('quotes/index', { 
                title: 'Quote Listing',
                quotes: quotes
            });

        });
    },

    getByNid: function (req, res, next) {
        db.connect();
        Quote.findOne({nid: req.params.id}, function (err, quote) {
            if (err)
                return next(err);
            db.close();

            res.render('quotes/single', { 
                title: 'Quote',
                quote: quote
            });
        });
    }
}