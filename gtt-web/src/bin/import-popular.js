'use strict'

const dotenv = require('dotenv');
dotenv.config(); 
const mongo = require('mongodb');
var db = require('../db');
var Author = require('../models/Author');

  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

var fs = require("fs");

const updateAuthor = function(author){

    // If the topic already exists, then just return that one for refere
    return Author.updateOne({_id: author._id},
        {popularAuthor: true}, function(err, author){
            if(err){
                console.log("Error updating popular author");
                console.log(err);
            }
            return author;            
    });

}
        
const t = (async function(){
var data = fs.readFileSync(__dirname + '/import-files/popular-authors.txt', 'utf-8').toString().split("\n");;

db.connect();
for(let obj in data){

console.log(data[obj]);
    var myPromise = () => {
        return new Promise(async (resolve, reject) => {

            await Author.findOne({nid: data[obj]}, function(err, author){
                
                if(err){
                    console.log(err);
                    throw Error(err);
                    //return;
                }

                console.log(author);

                return updateAuthor(author).
                then(a => {
                    resolve(a);
                }).
                catch(e => {
                    console.log("Failure: author: ");
                    console.log(author);
                    console.log(e);
                });
            });
        });
    }

    var r = await myPromise();
}
db.close();
});

t();