var Keyword = require('../models/Keyword');
var Quote = require('../models/Quote');
var db = require('../db');

module.exports = {
    
    listAll: function (req, res, next) {
        db.connect();
        Keyword.find({}, function (err, keywords) {
            if (err)
                return next(err);
            db.close();
             
            res.render('keywords/index', { 
                title: 'Keyword Listing',
                keywords: keywords
            });

        });
    },
    
    getById: function (req, res, next) {
        db.connect();
        Keyword.findOne({_id: req.params.id}).
            populate({
                path: 'quotes',
                model: 'Quote'
            }).
            exec(function (err, keyword) {
            if (err)
                return next(err);
            
            db.close();

            res.render('keywords/single', { 
                title: 'Keyword',
                keyword: keyword
            });
        });
    }
}