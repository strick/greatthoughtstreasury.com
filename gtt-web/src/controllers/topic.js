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
        db.connect();
        Topic.findOne({_id: req.params.id}).
            populate({
                path: 'quotes',
                model: 'Quote'
            }).
            exec(function (err, topic) {
            if (err)
                return next(err);
            
            db.close();

            res.render('topics/single', { 
                title: 'Topic',
                topic: topic
            });
        });
    }
}