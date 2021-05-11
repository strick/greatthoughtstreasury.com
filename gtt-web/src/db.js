mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config(); 


//const DB_URL = `${process.env.DBHOST}/${process.env.DBNAME}`;
const DB_URL = `${process.env.DBTYPE}//${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}/${process.env.DBNAME}`;//?retryWrites=true&w=majority`

module.exports = {
    
    connect: () => {

        console.log(DB_URL);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose.connect(DB_URL);

        //Log an error if we fail to connect
        mongoose.connection.on('error', err => {
            console.error(err);
            console.log(
            'MongoDB connection failed: ' + DB_URL
        );

        process.exit();

        });
    },

    //close the connection
    close: () => {
        mongoose.connection.close();
    }
};