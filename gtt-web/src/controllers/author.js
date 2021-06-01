var Author = require('../models/Author');
var Quote = require('../models/Quote');
var db = require('../db');
const paginate = require('../pagination');

module.exports = {
    
    listAll: function (req, res, next) {
 
        let viewObj = {
            title: 'Author Listing'
        }

        paginate.paginate(req, res, Author, viewObj, 'authors/index', 'authors');
    },

    listAllPage: function (req, res, next) {

        let viewObj = {
            title: 'Author Listing'
        }

        paginate.paginate(req, res, Author, viewObj, 'authors/index', 'authors');
    },

    getBySlug: function(req, res, next) {

        db.connect();
        Author.find({slug: req.params.slug}, function(err, author){
            if(err){

                console.error(err);
                db.close();
                res.status(404).send();
                return;//return next(err);
            }

            console.log(author);
            res.send(author);

            db.close();
        })
                
    },

    getByNid: function (req, res, next) {
        
        _paginate(req, res, next);

    },

    getByNidPage: function (req, res, next) {
        
        _paginate(req, res, next);

    }
}

const _paginate = function(req, res, next) {

    let controllerObj = {
        res: res,
        req: req,
        next: next,
        model: Author,
        relateModel: Quote,
        relateModelField: 'authorId',
        populate: {
            path: 'quotes',
            model: 'Quote'
        },
        viewScript: 'authors/single',
        resultsKey: 'author',
        viewObj: {
            title: 'Author'
        }
    };

    paginate.paginateSingle(controllerObj);
}