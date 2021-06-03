var Quote = require('../models/Quote');
var db = require('../db');
const paginate = require('../pagination');

module.exports = {
    
    listAll: function (req, res, next) {

        let viewObj = {
            title: 'Quotes Listing'
        }
        let populateObj = {
            path: 'topics',
            model: 'Topic'
        }

        //paginate.paginate(req, res, Quote, viewObj, 'quotes/index', 'quotes', populateObj);
        
        paginate.paginate2(req, res, next, Quote, viewObj, 'quotes/index', 'quotes',  {
            path: 'authorId',
            model: 'Author'
        }, populateObj);
    },

    listAllPage: function (req, res, next) {

        let viewObj = {
            title: 'Quotes Listing'
        }

        let populateObj = {
            path: 'topics',
            model: 'Topic'
        }

        //paginate.paginate(req, res, Quote, viewObj, 'quotes/index', 'quotes', populateObj);

        paginate.paginate2(req, res, next, Quote, viewObj, 'quotes/index', 'quotes',  {
            path: 'authorId',
            model: 'Author'
        }, populateObj);
     
    },

    getByNid: function (req, res, next) {
        db.connect();
        Quote.findOne({_id: req.params.id}).populate( {
            path: 'authorId',
            model: 'Author'
        }).populate({ path:'topics', model:'Topic'}).exec(function (err, quote) {
            
            if (err){
                // console.log(err);
                 if(err instanceof mongoose.Error.CastError){
                     db.close();
                     res.status(404).send();
                     return;
                 }
             }
 
             // If the result is null, then author doesn't exist
             if(quote == null){
                 db.close();
                 res.status(404).send();                
                 return;
             }
            
            //console.log(quote);
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

            var keywords = [];
            //Create keyword => ObjectId("keyword") for mongodb query
            quote.keywords.forEach(function(keyword){
                keywords.push(keyword);
            });

            let viewObj = {
                title: 'Related Quotes',
                quoteId: quote._id
            }

            let findQuery = {keywords: { $elemMatch: {$in: keywords}}};
            let populateObj = {
                path: 'topics',
                model: 'Topic'
            }

            paginate.paginate2(req, res, next, Quote, viewObj, 'quotes/related', 'quotes',  {
                path: 'authorId',
                model: 'Author'
            }, populateObj, 20, 1, findQuery);
        
        });
    }
}