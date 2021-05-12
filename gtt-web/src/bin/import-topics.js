'use strict'

const dotenv = require('dotenv');
dotenv.config(); 
const mongo = require('mongodb');
var db = require('../db');

var Topic = require('../models/Topic');

var Quote = require('../models/Quote');

  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

var fs = require("fs");

const createTopic = function(topic){
    return Topic.create(topic);
}

const addTopicToQuote = function(topic){

    // Get the qutoe _id
    return Quote.findOne({entity_id: topic.oldQuoteId}).
    then(quote => {
        quote.topics.push(topic._id);
        return quote.save(quote);
    });
}

const addQuoteToTopic = function (quote, topic){
    return Topic.findOne({_id: topic._id}).
    then(topic => {
      topic.quotes.push(quote._id);
      return topic.save(topic);  
    })
}

const createTopicQuoteChain = function(topic){

    // Append the topic to qutoes topic list
    return addTopicToQuote(topic).
    then(q => {
        // Append quote to topics quote list
        return addQuoteToTopic(q, topic);                                              
    });
}

var count = 0;

const saveFinished = function(c){
    console.log("C is " + c);
    c--;
    if(c < 1){
       console.log("Closing connection");
       db.close();
   }
   
   return c;

 }

 const generateTopic = function(obj){
    let topicObj = {
        topic: obj.topic,
        oldQuoteId: obj.quote_id,
        quoteId: new mongo.ObjectID
    };

    return topicObj;
 }

        
const buildTopics = async function() {
    // Open a new file with name input.txt and write Simply Easy Learning! to it.

    var data = fs.readFileSync(__dirname + '/import-files/topics_small.json');

    var jsonData = data;

    var jsonParsed = JSON.parse(jsonData); 
    console.log(jsonParsed.length);
    var topics = [];

    var c = jsonParsed.length;

    console.log("Pasing out " + c );

    jsonParsed.map(function(obj){
        obj.topic = obj.topic.toLocaleLowerCase().trim();
    });

    return Promise.all((jsonParsed).map(function(obj) {

        // If it is a new topic, then create it
        return Topic.findOne({topic: obj.topic}, function(err, topic){

            // Not a new topic, just do the topic and qutoe mapping
            if(topic != null) {
                console.log(topic);                
                return createTopic(generateTopic(obj)).
                then(t =>{
                    c = saveFinished(c);
                }); 
            }

            return createTopic(generateTopic(obj)).
            then(topic => {                      
                return createTopicQuoteChain(topic).
                then(t =>{
                    c = saveFinished(c);
                });
            }).
            catch(e => {
                console.log(e);
            });     
        });
    })).
    catch(e => {
        console.log(e);
    });
}


db.connect();
buildTopics();
//db.close();