const Author = require('../models/Author');
var db = require('../db');
const slugify = require('slugify');

db.connect();
Author.find({},function(err, authors){

    if(err){
        console.error(err);
        db.close();
        return;
    }

    var updateObj = [];
    // Create a slug and _id object for each author
    authors.forEach(function(author){

        // Create author fullnam
        let fullname = author.firstName + " " + author.lastName;

        // Create slug

        let slug = slugify(fullname, {
            replacement: '-',
            lower: true
        });
        
        if(slug == 'clara-lucas-balfour')
            console.log(slug);
        

    });

    db.close();


    // Update them all

});
