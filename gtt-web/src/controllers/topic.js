var Topic = require('../models/Topic');
var Quote = require('../models/Quote');
var db = require('../db');

module.exports = {
    
    listAll: function (req, res, next) {
        db.connect();
        Topic.find({}, function (err, topics) {
            if (err)
                return next(err);
            db.close();
             
            res.render('topics/index', { 
                title: 'Topic Listing',
                topics: topics
            });

        });
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