const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
    birth: String,
    death: String,
    image: String,
    nid: Number
});

module.exports = mongoose.model('Author', authorSchema);