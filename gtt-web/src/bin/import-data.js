'use strict'

const dotenv = require('dotenv');
dotenv.config(); 
const mongo = require('mongodb');
//console.log(process.env);
const Author = require('../models/Author');
var Quote = require('../models/Quote');
var db = require('../db');
//console.log(process.env);
var t = 1;
  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;
var authorsSkipped = 0;

var fs = require("fs");


    console.log("Reading Authors file");
    var authors =  buildAuthors();
    console.log("Reading Quotes file");
    var quotes =  buildQuotes();

(async function(){

    console.log("Connecting");
    db.connect();
    console.log("Inserting " + authors.length + " Authors");
    await Author.insertMany(authors).
    then(() => {
        console.log("Inserting "  + quotes.length + " Quotes");
        Quote.insertMany(quotes).
    then(results => {
        
        var c = results.length;

        // Look at each quote, find the author document with the old nid refernce and attach the quote to the author.
        console.log("Mapping authors to quotes");
        return Promise.all((results).map(function(quote) {

            if(c % 1000 == 0){
                console.log(c + " quotes remaning");
            }
            //console.log(quote.authorNid);
            return Author.findOne({nid: quote.authorNid}, function(err, author){
                
                if (err){
                    console.log("ERRRRRRR");
                    return next(err);
                }

                if(author != null){
                   
                    //console.log(author);
                    
                    // Only close the connection after everything has processed.
                    var saveFinished = function(){
                        c--;
                        if(c == 1){
                            console.log("Skipped " + authorsSkipped + " quotes");
                            console.log("Closing connection");
                          db.close();
                        } 
        
                      }

                    author.quotes.push(quote._id);
                    return author.save().then(() => {
                        // Update the qauote with the new mongo refrence
                        return Quote.updateOne({_id: quote._id}, {authorId: author._id}).then(() => {
                            saveFinished();
                        });
                      
                    }).catch(e => {
                        console.log(e);
                    });                                
                }
                else {
                    c--;
                    authorsSkipped++;
                }
            })
        }))
    }).
    catch(e => {
        console.log("Adding quote error");
        console.log(e);
    });
    });
    //db.close();
    
})();

function buildAuthors() {
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
                    image: parts[5],
                    nid: parts[6],
                    quotes: []
                });
            }
            count++;
            
        });
        console.log("Author count: " + count);
       // console.log(authors);
    }
    catch(err){
        console.error(err);
    }
    return authors;
}

function buildQuotes(authors)
{

        // TODO Santaize this.
        //const data = fs.readFileSync(__dirname + '/import-files/quotes_test.json', 'UTF-8');
        var count = 0; 
        var quotes = [];

        var data = fs.readFileSync(__dirname + '/import-files/quotes_test.json');

        var jsonData = data;

        var jsonParsed = JSON.parse(jsonData);

        jsonParsed.forEach(function(row){

            if(count < 1) {
                count++;
                return;
            }
            //console.log(row);
            
            quotes.push({
                quote: row.field_quot_value,
                authorNid: row.field_author_target_id,
                authorId: new mongo.ObjectID
            });

            count++;
        });


    console.log("Quote count: " + count);

    return quotes;
}
