var Quote = require('../models/Quote');
var db = require('../db');
const paginate = require('../pagination');
const { populate } = require('../models/Quote');

module.exports = {
    
    listAll: function (req, res, next) {

        let viewObj = {
            title: 'Quotes Listing'
        }

        paginate.paginate(req, res, Quote, viewObj, 'quotes/index', 'quotes');
    },

    listAllPage: function (req, res, next) {

        let viewObj = {
            title: 'Quotes Listing'
        }

        let populateObj = {
            path: 'topics',
            model: 'Topic'
        }

        paginate.paginate(req, res, Quote, viewObj, 'quotes/index', 'quotes', populateObj);
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
    },

    related: function(req, res, next) {

        // Get quotes with the same keywords

        // Get keywords on this quote

        

        db.connect();
        Quote.findOne({_id: req.params.id}, function (err, quote) {
            if (err)
                return next(err);
         
            // Query quotes containing any of the keywords of the given quote.
            Quote.find({keywords: { $elemMatch: [quote.keywords]}}, function(err, quotes){

                db.close();

                res.render('quotes/related', { 
                    title: 'Related Quotes',
                    quotes: quotes
                });
                
            });            
        });
    }
}