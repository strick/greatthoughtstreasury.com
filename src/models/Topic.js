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
    },
    quotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quote'}],
    slug: {type: String, slug: ["topic"]}
});

module.exports = mongoose.model('Topic', topicSchema, "topics");