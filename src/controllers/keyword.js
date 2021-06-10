var Keyword = require('../models/Keyword');
var Quote = require('../models/Quote');
var db = require('../db');
const paginate = require('../pagination');

module.exports = {
    
    listAll: function (req, res, next) {

        let viewObj = {
            title: 'Keyword Listing'
        }

        paginate.paginate(req, res, Keyword, viewObj, 'keywords/index', 'keywords');
        //_paginate(req, res);
    },

    listAllPage: function (req, res, next) {

        let viewObj = {
            title: 'Keyword Listing'
        }

        paginate.paginate(req, res, Keyword, viewObj, 'keywords/index', 'keywords');
        //_paginate(req, res);
    },
    
    getById: function (req, res, next) {
        
        _paginate(req, res, next);

    },

    getByIdPage: function (req, res, next) {
        
        _paginate(req, res, next);

    }
}

const _paginate = function(req, res, next) {

    let controllerObj = {
        res: res,
        req: req,
        next: next,
        model: Keyword,
        relateModel: Quote,
        relateModelField: 'keywords',
        populate: {
            path: 'quotes',
            model: 'Quote'
        },
        viewScript: 'keywords/single',
        resultsKey: 'keyword',
        viewObj: {
            title: 'Keyword'
        }
    };

    paginate.paginateSingle(controllerObj);
}