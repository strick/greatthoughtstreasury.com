'use strict'

const dotenv = require('dotenv');
dotenv.config(); 
const mongo = require('mongodb');
var db = require('../db');

var Topic = require('../models/Topic');

  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

var fs = require("fs");

var topics = buildTopics();

(async function(){

    console.log("Connecting");
    db.connect();
    console.log("Inserting " + topics.length + " Topics");
    await Topic.insertMany(topics).
    catch(e => {
        console.log("Adding topic error");
        console.log(e);
    });
    db.close();
})();

function buildTopics() {
    // Open a new file with name input.txt and write Simply Easy Learning! to it.
    try {
        const data = fs.readFileSync(__dirname + '/import-files/topics.txt', 'UTF-8');

        const lines = data.split(/\r?\n/);

        var topics = [];
        var count = 0;
        lines.forEach((line) => {

            line = line.toLocaleLowerCase();
            console.log(line);
            let parts = line.split('\t');

            if(count > 0){
                topics.push({
                    topic: parts[0],
                    oldQuoteId: parts[1],
                    quoteId: new mongo.ObjectID
                });
            }
            
            count++;
            
        });
        console.log("Topic count: " + count);
    }
    catch(err){
        console.error(err);
    }
    return topics;
}