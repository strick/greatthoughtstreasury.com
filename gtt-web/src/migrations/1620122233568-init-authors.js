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

      return db.createCollection("authors")
      .then(collection => {

        let authors = [
          { firstName: "Abaye", lastName: NULL, bio: "Rabbi of the Jewish Talmu", birth: NULL, death: 339, image: "abaye[1].gif", nid: 186690},
          { firstName: "Francis", lastName: "Ellington", bio: "Abbot	Theologian, Unitarian Minister", birth: 1836, death: 1903, image: NULL, nid: 186691},
          { firstName: "John", lastName: "Abbott, fully John Stevens Cabot Abbott", bio: "American Historian, Pastor and Pedagogical Writer", birth: 1805, death: 1877, image: "JohnStevens-CabotAbbott-68-s[1].jpg", nid: 186692},
        ];

        return db.collection("authors").insertMany(authors);
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
      return db.dropCollection("authors")
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
