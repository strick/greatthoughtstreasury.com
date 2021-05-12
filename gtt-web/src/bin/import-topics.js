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
    console.log("Searching: " + topic.oldQuoteId);
    return Quote.findOne({entity_id: topic.oldQuoteId}).
    then(quote => {
        if(quote == undefined) return;
        console.log("Tpoc: " + topic.oldQuoteId);
        console.log("The id is: " + topic._id);
        console.log(quote);
        quote.topics.push(topic._id);
        console.log(quote);
        return quote.save(quote);
    });
}
var count = 0;


        
const buildTopics = async function() {
    // Open a new file with name input.txt and write Simply Easy Learning! to it.
  
    try {
        var data = fs.readFileSync(__dirname + '/import-files/topics_small.json');

        var jsonData = data;

        var jsonParsed = JSON.parse(jsonData); 

        var topics = [];

        //jsonParsed.forEach(doIt);
        jsonParsed.map(function(obj){
            obj.topic = obj.topic.toLocaleLowerCase().trim();
        })

        jsonParsed.forEach(function(obj){
   
            return Promise.all((jsonParsed).map(function(obj) {
                // If it is a new topic, then create it
                return Topic.findOne({topic: obj.topic}, function(err, topic){

                   //console.log(topic);
                   if(topic != null) {
                        console.log(topic);
                        return;
                    }
                
                    console.log('Creating');
                    let o = {
                        topic: obj.topic,
                        oldQuoteId: obj.quote_id,
                        quoteId: new mongo.ObjectID
                    };
                    return createTopic(o).
                    then(topic => {                      
                       return addTopicToQuote(topic);
                    }).
                    catch(e => {
                        console.log(e);
                    });
                
                }).
                catch(e => {
                    console.log(e);
                });
            })).
            catch(e => {
                console.log(e);
            })
        });
    }
    catch(e){
        console.log(e);
    }

        console.log("Topic count: " + count);
  
    return topics;
}

async function doIt(obj){

    //console.log(obj);
  //  console.log(topics);
    if(count == 0 || count > 10){
        count++;
        return;
    }

    let topicName = obj.topic.toLocaleLowerCase().trim();

    console.log("Testing)");

    // If it is a new topic, then create it
    return Topic.find({topic: topicName}).
    then(topic => {

        console.log(topic);
        if(topic != null) {
            console.log(topic);
            return;
        }
    
        console.log('Creating');
        return createTopic({
            topic: topicName,
            oldQuoteId: obj.quote_id,
            quoteId: new mongo.ObjectID
        });     
    }).
    catch(e => {
              console.log(e);
    });
    

    // Reference the topic
    var topicRef = topics.find(function(t){
                        
        if(t.topic === topicName)
            return t;
    });

    // Attach the quote
    addTopicToQuote(topicRef);
          
    count++;

    if(count > 10000) {
        return;// topics;
    }
    //return topics;
    
}

db.connect();
buildTopics();
//db.close();