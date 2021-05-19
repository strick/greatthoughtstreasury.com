var Quote = require('../models/Quote');
var Author = require('../models/Author');
var db = require('../db');

module.exports = {
    
    search: function (req, res, next){
        
        db.connect();

        var search = req.body.q;

        Quote.find({quote: new RegExp(`\\b(${search})\\b`, 'i')}, function(err, results){

            db.close();             
            if (err)
                return next(err);     
            
            res.send(results);

        });
 
            

/*
        res.send("Hello");
        res.render('search/results', { 
            title: 'Search Results'
        });
*/
    }
}