var Author = require('../models/Author');
var Quote = require('../models/Quote');
var db = require('../db');

module.exports = {
    
    listAll: function (req, res, next) {
        db.connect();
        Author.find({}, function (err, authors) {
            if (err)
                return next(err);
            db.close();
             
            res.render('authors/index', { 
                title: 'Author Listing',
                authors: authors
            });

        });
    },

    getByNid: function (req, res, next) {
        db.connect();

        
        Author.findOne({_id: req.params.id}).
            populate({
                path: 'quotes',
                model: 'Quote'
            }).
            exec(function (err, author) {
            if (err)
                return next(err);
               
           // console.log(author);

           db.close();

            res.render('authors/single', { 
                title: 'Author',
                author: author
            });
        });
    }
}