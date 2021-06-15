const Topic = require('../models/Topic');
var db = require('../db');
const slugify = require('slugify')

db.connect();
Topic.find({},function(err, topics){

    if(err){
        console.error(err);
        db.close();
        return;
    }

    var updateObj = [];
    // Create a slug and _id object for each author

    var count = topics.length;

    topics.forEach(async function(topic){

        count--;

         // Create slug
         let slug = slugify(topic.topic, {
             replacement: '-',
             lower: true,
             strict: true
         });

        var myPromise = () => {

            return new Promise(async(resolve, reject) => {
                
                await Topic.updateOne({_id: topic._id},{slug: slug});

            });
        }

        var r = await myPromise();
  
        if(count == 0)
            db.close();
    });

});