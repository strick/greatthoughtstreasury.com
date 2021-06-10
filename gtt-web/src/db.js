mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config(); 


//const DB_URL = `${process.env.DBHOST}/${process.env.DBNAME}`;
var URL = "";
//console.log("ENV is : " + process.env.ENV);

if(process.env.ENV == "dev"){
    URL = `${process.env.DBTYPE}://${process.env.DBHOST}/${process.env.DBNAME}`;//?retryWrites=true&w=majority`
    //URL = `${process.env.DBTYPE}://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority`;
}
else {
    
    URL = `${process.env.DBTYPE}://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority`;
    //console.log(URL);
}

const DB_URL = URL;
module.exports = {

    connect: (app) => {

       // console.log(DB_URL);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        //mongoose.set('serverSelectionTimeout', 60000000);

        return mongoose.connect(DB_URL, {
            serverSelectionTimeoutMS: 300000,
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
        })
        .then(x => {
            console.log( `Connected to dB: "${x.connections[0].host}"`);
            app.emit('ready');
        })
        .catch(err => {

            console.error("Error to db", err);
            process.exit();
        });
    },

    //close the connection
    close: () => {
        mongoose.connection.close();
    }
};