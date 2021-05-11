const dotenv = require('dotenv');
dotenv.config(); 

var url = "";

if(process.env.ENV == "dev"){
  url = `${process.env.DBTYPE}://${process.env.DBHOST}/${process.env.DBNAME}`;//?retryWrites=true&w=majority`
}
else {
  url = `${process.env.DBTYPE}://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}`;//?retryWrites=true&w=majority`
}
  
  // create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

module.exports.up = next => {
 
  // make client connect to mongo service
  return MongoClient.connect(url,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(client => {
      
      let db = client.db();
      return db.createCollection("authors")      
      .then(() => {
         
        console.log("authors collection is created!");
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
      return db.dropCollection("authors")
      .then(() => {
        console.log("authors collection is deleted!");
        client.close();
      });
s            
    })
    .catch(err => {
      console.error(err);
    });
}
