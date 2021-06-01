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
         let firstName = author.firstName == "NULL" ? "" : author.firstName;
         let lastName = author.lastName == "NULL" ? "" : author.lastName;
         let fullname = firstName + " " + lastName;

         // Create slug
         let slug = slugify(fullname, {
             replacement: '-',
             lower: true,
             strict: true
         });

        var myPromise = () => {

            return new Promise(async(resolve, reject) => {
                
                await Author.updateOne({_id: author._id},{slug: slug});

            });
        }

        var r = await myPromise();
  
        if(count == 0)
            db.close();
    });

});