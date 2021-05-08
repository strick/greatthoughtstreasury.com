'use strict'

const dotenv = require('dotenv');
dotenv.config(); 

console.log(process.env);
const Author = require('../models/Author');
var Quote = require('../models/Quote');
var db = require('../db');
console.log(process.env);
var t = 1;
  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

var fs = require("fs");
console.log("Reading Authors file");

// Open a new file with name input.txt and write Simply Easy Learning! to it.
try {
    const data = fs.readFileSync(__dirname + '/import-files/authors.txt', 'UTF-8');

    const lines = data.split(/\r?\n/);

    var authors = [];
    var count = 0;
    lines.forEach((line) => {
        //console.log(line);
        let parts = line.split('\t');

        if(count > 0){
            authors.push({
                firstName: parts[0],
                lastName: parts[1],
                bio: parts[2],
                birth: parts[3],
                death: parts[4],
                image: parts[5]
            });
        }
        count++;
        
    });
    console.log("Author count: " + count);
    console.log(authors);
}
catch(err){
    console.error(err);
}


(async function(){
    console.log("Connecting");
    await db.connect();
    console.log("Inserting")
    await Author.insertMany(authors);
    console.log("closing");
    db.close();
})();
