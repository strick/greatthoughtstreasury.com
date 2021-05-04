const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quote: String,
    author: Number,  
    id: Number
});

module.exports = mongoose.model('Quote', quoteSchema);