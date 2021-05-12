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

    // If the topic already exists, then just return that one for refere
    return Topic.findOne({_id: topic._id}).
    then(t => {
        if(t == null)
            return Topic.create(topic)
    })
    return Topic.create(topic);
}

const addTopicToQuote = function(topic){

    // Get the qutoe _id
    ///console.log("Looking at ");
    //console.log(topic);
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

    // BUG FIX NEEDED:   Save quote is added to pics

    for (const obj of jsonParsed){
        c--;
        var myPromise = () => {
            return new Promise(async (resolve, reject) => {

                db.connect();
                await Topic.findOne({topic: obj.topic}, async function(err, topic){
                   
                    // Not a new topic, just do the topic and qutoe mapping
                    if(topic != null){
             
                        //console.log(topic);

                        topic.oldQuoteId = obj.quote_id;
                        //console.log(topic);
                        // Update the topic Quote id t the new one                        
                        return createTopicQuoteChain(topic).
                        then(t =>{
                            resolve(t);
                        });
                    }

                    // Create the new topic in the database and build relations
                    var myPromise2 = () => {
                        return new Promise(async (resolve, reject) => {
                            //console.log("Adding " + obj.quote_id);
                            let t = await createTopicQuoteChain(await createTopic(generateTopic(obj)));
                            //console.log("Completed " + obj.quote_id);

                            resolve(t);
                        })
                    }
                
                    var t = await myPromise2();
                    
                    resolve(t);
                });
            })
        }
  
        //console.log(obj);
        var r = await myPromise();
        if(c == 0) db.close();

    }

}

buildTopics();