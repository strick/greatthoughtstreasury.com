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

        _paginate(req,res,next,{slug: req.params.slug});

    },

    getByNid: function (req, res, next) {
        
        _paginate(req, res, next);

    },

    getByNidPage: function (req, res, next) {
        
        _paginate(req, res, next);

    }
}

const _paginate = function(req, res, next, findQuery) {

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

    paginate.paginateSingle(controllerObj, findQuery);
}