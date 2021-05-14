const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const keywordSchema = new Schema({
    keyword: {
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
    quotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quote'}]
});

module.exports = mongoose.model('Keyword', keywordSchema, "keywords");