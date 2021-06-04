mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config(); 


//const DB_URL = `${process.env.DBHOST}/${process.env.DBNAME}`;
var URL = "";
//console.log("ENV is : " + process.env.ENV);

if(process.env.ENV == "dev"){
    URL = `${process.env.DBTYPE}://${process.env.DBHOST}/${process.env.DBNAME}`;//?retryWrites=true&w=majority`
    URL = `${process.env.DBTYPE}://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority`;


}
else {
    URL = `${process.env.DBTYPE}://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}?retryWrites=true&w=majority`;
}

const DB_URL = URL;
var connectionReady = false;
//console.log(DB_URL);
module.exports = {

    connect: (app) => {

       // console.log(DB_URL);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        //mongoose.set('serverSelectionTimeout', 60000000);
        mongoose.connect(DB_URL, {
            serverSelectionTimeoutMS: 300000,
            useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true
        });

        //Log an error if we fail to connect
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
               'MongoDB connection failed: ' + DB_URL
            );
            process.exit();
        });

        mongoose.connection.on('open', function (ref) {
            console.log('CONNECTED TO MONGO SERVER.');
            app.emit('ready');
        });

        //while(!connectionReady) ;
    },

    //close the connection
    close: () => {
        mongoose.connection.close();
    }
};