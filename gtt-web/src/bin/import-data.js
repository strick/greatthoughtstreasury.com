'use strict'

const Author = require('../models/Author');
var Quote = require('../models/Quote');
var db = require('../db');
var t = 1;
  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

var fs = require("fs");
console.log("Reading Authors file");
// Open a new file with name input.txt and write Simply Easy Learning! to it.
try {
    const data = fs.readFileSync(__dirname + '/import-files/authors.txt', 'UTF-8');

    const lines = data.split(/\r?\n/);

    var count = 0;
    lines.forEach((line) => {
        //console.log(line);
        count++;
    });
    console.log("Author count: " + count);
}
catch(err){
    console.error(err);
}
