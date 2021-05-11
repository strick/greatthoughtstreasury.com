const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    oldQuoteId: {
        type: Number
    },
    quoteId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Quote'
    }
});

module.exports = mongoose.model('Topic', topicSchema, "topics");