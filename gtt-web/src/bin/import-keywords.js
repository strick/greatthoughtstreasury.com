'use strict'

const dotenv = require('dotenv');
dotenv.config(); 
const mongo = require('mongodb');
var db = require('../db');
var Keyword = require('../models/Keyword');
var Quote = require('../models/Quote');

  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

var fs = require("fs");
const { nextTick } = require('process');

const createKeyword = function(keyword){

    // If the keyword already exists, then just return that one for refere
    return Keyword.findOne({_id: keyword._id}).
    then(t => {
        if(t == null)
            return Keyword.create(keyword)
    }).
    catch(e => {
        console.log("createKeyword: Failure: keyword:");
        console.log(keyword);
        console.log(e);
    });
}
var missedQuotes = 0;
const addKeywordToQuote = function(keyword){

    return Quote.findOne({entity_id: keyword.oldQuoteId}).
    then(quote => {

        if(quote == null) {
            missedQuotes++;
            return;
        }
        quote.keywords.push(keyword._id);
        return quote.save(quote);
    }).
    catch(e => {
        console.log("addKeywordToQuote: Failure: keyword: ");
        console.log(keyword);
        console.log(e);
    });
}

const addQuoteToKeyword = function (quote, keyword){
    return Keyword.findOne({_id: keyword._id}).
    then(keyword => {
      keyword.quotes.push(quote._id);
      return keyword.save(keyword);  
    }).
    catch(e => {
        console.log("addQuoteToKeyword: Failure: keyword: ");
        console.log(keyword);
        console.log("Quote: ");
        console.log(quote);
        console.log(e);
    });
}

const createKeywordQuoteChain = function(keyword){

    // Append the keyword to qutoes keyword list
    return addKeywordToQuote(keyword).
    then(q => {
        if(q == null) return;
        // Append quote to keywords quote list
        return addQuoteToKeyword(q, keyword);                                              
    }).
    catch(e => {
        console.log("createKeywordQuoteChain: Failure: keyword: ");
        console.log(keyword);
        console.log(e);
    });
}

var count = 0;

 const generateKeyword = function(obj){
    let keywordObj = {
        keyword: obj.topic,
        oldQuoteId: obj.quote_id,
        quoteId: new mongo.ObjectID
    };

    return keywordObj;
 }

        
const buildKeywords = async function() {
    // Open a new file with name input.txt and write Simply Easy Learning! to it.

    var data = fs.readFileSync(__dirname + '/import-files/topics.json');

    var jsonData = data;

    var jsonParsed = JSON.parse(jsonData); 
    console.log(jsonParsed.length);
    var keywords = [];

    var c = jsonParsed.length;



    // Need to introduce Keywords.  Keywords are UCase, Keywords are LCase
   
    var keywords = [];

    jsonParsed.map(function(obj){

        // If it's a keyword
        if(obj.topic === obj.topic.toLocaleLowerCase().trim()){
            keywords.push(obj);
        }
        
        //obj.keyword = obj.keyword.toLocaleLowerCase().trim();
    });

    c = keywords.length;
    //var c2 = keywords.length;
    console.log("Pasing out " + c  + " keywords") ;
   // console.log("Pasing out " + c2 + " keywords");

    // BUG FIX NEEDED:   Save quote is added to pics
    db.connect();
    for (const obj of keywords){
        c--;
        var myPromise = () => {
            return new Promise(async (resolve, reject) => {

                
                await Keyword.findOne({keyword: obj.topic}, async function(err, keyword){
                   
                    // Not a new keyword, just do the keyword and qutoe mapping
                    if(keyword != null){
             
                        //console.log(keyword);

                        keyword.oldQuoteId = obj.quote_id;
                        //console.log(keyword);
                        // Update the keyword Quote id t the new one                        
                        return createKeywordQuoteChain(keyword).
                        then(t =>{
                            resolve(t);
                        }).
                        catch(e => {
                            console.log("createKeywordQuoteChain (Normal call): Failure: keyword: ");
                            console.log(keyword);
                            console.log(e);
                        });
                    }

                    // Create the new keyword in the database and build relations
                    var myPromise2 = () => {
                        return new Promise(async (resolve, reject) => {
                            //console.log("Adding " + obj.quote_id);
                            let t = await createKeywordQuoteChain(await createKeyword(generateKeyword(obj)));
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
        if(c % 1000 == 0){
            console.log(c + " keywords remaning");
        }
        if(c == 0) db.close();

    }

}

buildKeywords();
console.log("Missed quotes is: " + missedQuotes);