var Topic = require('../models/Topic');
var Quote = require('../models/Quote');
var Author = require('../models/Author');
var db = require('../db');
const paginate = require('../pagination');

module.exports = {
    
    listAll: function (req, res, next) {

        let viewObj = {
            title: 'Topic Listing'
        }

        paginate.paginate(req, res, next, Topic, viewObj, 'topics/index', 'topics', null, 2000);
    },

    listAllPage: function (req, res, next) {

        let viewObj = {
            title: 'Topic Listing'
        }
     
        paginate.paginate(req, res, next, Topic, viewObj, 'topics/index', 'topics', null, 2000);
    },
    
    getById: function (req, res, next) {
        
        _paginate(req, res, next);

    },

    getBySlug: function(req, res, next) {

        //console.log(req.params.slug);
       // var modelObject = paginate.createModelObject(req, model, populateObj, perPage, page, findQuery);
       var controllerObj = getControllerObj(req, res, next);
       controllerObj.populate = {

            path: 'quotes',
            populate: {
                path: 'authors',
                model: 'Author'
            },
            model: 'Quote'
        };
        _paginate(req,res,next,{slug: req.params.slug.toLowerCase()}, controllerObj);

    },

    getByIdPage: function (req, res, next) {
        
        _paginate(req, res, next);

    }
}

const _paginate = function(req, res, next, findQuery, controllerObj) {

    var controllerObj = controllerObj || getControllerObj(req, res, next);

  //  console.log(controllerObj);

    paginate.paginateSingle(controllerObj, findQuery);
}

const getControllerObj = function(req, res, next) {

    return {
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
            title: 'Topic',
            authorModel: Author
        }
    }
}