'use strict'

const Author = require('../models/Author');
var Quote = require('../models/Quote');
var db = require('../db');
var t = 1;
  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

module.exports.up = function (next) {

    db.connect();

    let authors = [
      { firstName: "Abaye", bio: "Rabbi of the Jewish Talmu", death: 339, image: "abaye[1].gif"},
      { firstName: "Francis", lastName: "Ellington", bio: "Abbot	Theologian, Unitarian Minister", birth: 1836, death: 1903},
      { firstName: "John", lastName: "Abbott, fully John Stevens Cabot Abbott", bio: "American Historian, Pastor and Pedagogical Writer", birth: 1805, death: 1877, image: "JohnStevens-CabotAbbott-68-s[1].jpg" }
    ];

    return Author.insertMany(authors)
    .then(results => {
      console.log("Added Authors... Attaching quotes...");      

      //console.log(results);

      let quotes = [
        {authorId: results[0]._id, quote: 'A mind conscious of integrity scorns to say more than it means to perform'},
        {authorId: results[0]._id, quote: "A mind conscious of integrity scorns to say more than it means to perform"},
        {authorId: results[0]._id, quote: "That which cometh from the heart will go to the heart."},
        {authorId: results[1]._id, quote: "One of the saddest experiences which can ever come to a human being is to awaken, gray-haired and wrinkled near the close of an unproductive career, to the fact that all through the years he has been using only a small part of himself"},
        {authorId: results[1]._id, quote: "Character is formed, not by laws, commands, and decrees, but by quiet influence, unconscious suggestion and personal guidance."},
        {authorId: results[2]._id, quote: "From self alone expect applause."},
        {authorId: results[2]._id, quote: "Temperance is a bridle of gold."}
      ];

      return Quote.insertMany(quotes).
      then(results => {

        return Promise.all((results).map(function(quote) {

            return Author.findOne({_id: quote.authorId}, function(err, author){
                author.quotes.push(quote._id);
                author.save();
              
            })
        }))
      
    })

    .catch(err => {
      console.error(err);
    });

    db.close();
    next()
})
}

function _buildAuthor(authorObj)
{
  const new_author = new Author(authorObj);
  return new_author.save()
    .then(saved => {
      return saved;
    })
    .catch(error => {
      console.log(error);
    })
}

module.exports.down = function (next) {
  next()
}
