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
    console.log("Closing");
    db.close();
})();

function buildTopics() {
    // Open a new file with name input.txt and write Simply Easy Learning! to it.
    try {
        var data = fs.readFileSync(__dirname + '/import-files/topics.json');

        var jsonData = data;

        var jsonParsed = JSON.parse(jsonData);

        var topics = [];
        var count = 0;
        jsonData.forEach((obj) => {

            if(count > 0){
                topics.push({
                    topic: obj.topic.toLocaleLowerCase(),
                    oldQuoteId: obj.quote_id,
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