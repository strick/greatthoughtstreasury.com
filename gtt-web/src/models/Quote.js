const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quote: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },    
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Topic'
    }
});


module.exports = mongoose.model('Quote', quoteSchema, 'quotes');