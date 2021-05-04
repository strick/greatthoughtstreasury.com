var Author = require('../models/Author');
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

    getById: function (req, res, next) {
        Author.findById(req.params.id, function (err, author) {
            if (err)
                return next(err);
            res.json(author)
        });
    }
}