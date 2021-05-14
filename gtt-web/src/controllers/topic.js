var Topic = require('../models/Topic');
var Quote = require('../models/Quote');
var db = require('../db');
const paginate = require('../pagination');

module.exports = {
    
    listAll: function (req, res, next) {

        let viewObj = {
            title: 'Topic Listing'
        }

        paginate.paginate(req, res, Topic, viewObj, 'topics/index', 'topics');
    },

    listAllPage: function (req, res, next) {

        let viewObj = {
            title: 'Topic Listing'
        }

        paginate.paginate(req, res, Topic, viewObj, 'topics/index', 'topics');
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
        model: Topic,
        relateModel: Quote,
        relateModelField: 'topics',
        populate: {
            path: 'quotes',
            model: 'Quote'
        },
        viewScript: 'topics/single',
        resultsKey: 'topic',
        viewObj: {
            title: 'Topic'
        }
    };

    paginate.paginateSingle(controllerObj);
}