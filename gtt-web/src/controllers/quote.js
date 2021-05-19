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

        db.connect();
        Quote.findOne({_id: req.params.id}, function (err, quote) {
            if (err){
                db.close();
                return next(err);
            }
         
            console.log(quote.keywords);

            var keywords = [];
            //Create keyword => ObjectId("keyword") for mongodb query
            quote.keywords.forEach(function(keyword){
                keywords.push(keyword);
            });
            
            console.log("{keywords: { $elemMatch: {$in: " + keywords + "}}");
            // Query quotes containing any of the keywords of the given quote.
            Quote.find({keywords: { $elemMatch: {$in: keywords}}}, function(err, quotes){

                if (err){
                    db.close();
                    return next(err);
                }
                db.close();

                res.render('quotes/related', { 
                    title: 'Related Quotes',
                    quotes: quotes
                });
                
            });            
        });
    }
}