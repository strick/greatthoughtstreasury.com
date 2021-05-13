var Topic = require('../models/Topic');
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
    }
}