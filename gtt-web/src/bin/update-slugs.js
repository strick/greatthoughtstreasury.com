const Author = require('../models/Author');
var db = require('../db');
const slugify = require('slugify')

db.connect();
Author.find({},function(err, authors){

    if(err){
        console.error(err);
        db.close();
        return;
    }

    var updateObj = [];
    // Create a slug and _id object for each author

    var count = authors.length;

    authors.forEach(async function(author){

        count--;

         // Create author fullnam
         let fullname = author.firstName + " " + author.lastName;

         // Create slug
         let slug = slugify(fullname, {
             replacement: '-',
             lower: true
         });

        var myPromise = () => {

            return new Promise(async(resolve, reject) => {
                
                await Author.updateOne({_id: author._id},{slug: slug}, function(err, author){
                    console.log("Updated ONNNN");
                }).
                then(t => {
                    resolve(t);
                });

            });
        }

        var r = await myPromise();
  
        if(count == 0)
            db.close();
    });

});