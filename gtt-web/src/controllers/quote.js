var Quote = require('../models/Quote');
var db = require('../db');
const paginate = require('../pagination');

module.exports = {
    
    listAll: function (req, res, next) {
        //db.connect();

        var perPage = 10;
        var page = req.params.page || 1;

        let viewObj = {
            title: 'Quotes Listing'
        }

        paginate.paginate(perPage, page, res, Quote, viewObj, 'quotes/index', 'quotes');
    },

    listAllPage: function (req, res, next) {
        //db.connect();

        var perPage = 10;
        var page = req.params.page || 1;

        let viewObj = {
            title: 'Quotes Listing'
        }

        paginate.paginate(perPage, page, res, Quote, viewObj, 'quotes/index', 'quotes');
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