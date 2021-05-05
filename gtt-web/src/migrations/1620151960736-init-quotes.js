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
      
      return db.createCollection("quotes")
      .then(() => {
         
        console.log("quotes collection is created!");
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

      // create 'users' collection in newdb database
      return db.dropCollection("quotes")
      .then(() => {
        console.log("quotes collection is Deleted!");
        client.close();
      });
s            
    })
    .catch(err => {
      console.error(err);
    });
}
