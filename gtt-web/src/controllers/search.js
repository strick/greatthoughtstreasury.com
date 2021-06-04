var Quote = require('../models/Quote');
var Author = require('../models/Author');
var db = require('../db');

module.exports = {
    
    search: function (req, res, next){
        
        //db.connect();

        var search = req.body.q;

        var all = ['quotes', 'authors'];
        var results = [];

        Quote.find({quote: new RegExp(`\\b(${search})\\b`, 'i')}).populate({ path:'topics', model:'Topic'}).exec(function(err, results){
          
            if (err) {                
                db.close();   
                return next(err);     
            }

            Author.aggregate(
                [
                    {$project: {fullName:{$concat: ["$firstName", " ", "$lastName"]}}},
                    {$match:{fullName: new RegExp(`\\b(${search})\\b`, 'i')}}
                ],
                function(err, results2){
 
                
                if (err) {                
                    db.close();   
                    return next(err);     
                }

                //console.log(results.concat(results2));

                res.render('search/index', {
                    title: 'Search Results: ' + search,
                    quotes: results,
                    authors: results2
                });
            });

        });
    }
}