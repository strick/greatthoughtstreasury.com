var Quote = require('../models/Quote');
var Author = require('../models/Author');
var db = require('../db');

module.exports = {
    
    search: function (req, res, next){

        res.render("Hello");
        res.render('search/results', { 
            title: 'Search Results'
        });

    }
}