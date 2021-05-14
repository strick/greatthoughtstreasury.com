var Keyword = require('../models/Keyword');
var Quote = require('../models/Quote');
var db = require('../db');
const paginate = require('../pagination');

module.exports = {
    
    listAll: function (req, res, next) {
        //db.connect();

        var perPage = 25;
        var page = req.params.page || 1;

        let viewObj = {
            title: 'Keyword Listing'
        }

        paginate.paginate(perPage, page, res, Keyword, viewObj, 'keywords/index', 'keywords');
    },

    listAllPage: function (req, res, next) {
        //db.connect();

        var perPage = 25;
        var page = req.params.page || 1;

        let viewObj = {
            title: 'Keyword Listing'
        }

        paginate.paginate(perPage, page, res, Keyword, viewObj, 'keywords/index', 'keywords');
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