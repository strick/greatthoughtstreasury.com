const dotenv = require('dotenv');
dotenv.config(); 

var url = `${process.env.DBHOST}/${process.env.DBNAME}`;
  
  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

module.exports.up = next => {
 
  // make client connect to mongo service
  return MongoClient.connect(url,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      
      let db = client.db();

      console.log("Switched to "+db.databaseName+" database");      

      return db.createCollection("quotes")
      .then(collection => {

        let quotes = [
          {quote: "A mind conscious of integrity scorns to say more than it means to perform", author: 186690, id: 1},
          {quote: "That which cometh from the heart will go to the heart.", author: 186690, id: 2},
          {quote: "One of the saddest experiences which can ever come to a human being is to awaken, gray-haired and wrinkled near the close of an unproductive career, to the fact that all through the years he has been using only a small part of himself", author: 186690, id: 3},
          {quote: "Character is formed, not by laws, commands, and decrees, but by quiet influence, unconscious suggestion and personal guidance.", author: 186691, id: 4},
          {quote: "From self alone expect applause.", author: 186691, id: 5},
          {quote: "Temperance is a bridle of gold.", author: 186692, id: 6}
        ];

        return db.collection("quotes").insertMany(quotes);
      })
      .then(() => {
         
        console.log("Collection is created!");
        client.close();

      });

    })
  
    .catch(err => {
      console.error(err);
    });

}

module.exports.down = next => {

  // make client connect to mongo service
  return MongoClient.connect(url,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      
      let db = client.db();

      // db pointing to newdb
      console.log("Switched to "+db.databaseName+" database");

      // create 'users' collection in newdb database
      return db.dropCollection("quotes")
      .then(() => {
        console.log("Collection is Deleted!");
        client.close();
      });
s            
    })
    .catch(err => {
      console.error(err);
    });
}
