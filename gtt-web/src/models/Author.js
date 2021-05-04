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

// https://mongoosejs.com/docs/populate.html#populate-virtuals
authorSchema.virtual('quotes', {
    ref: 'Quote',
    localField: '_id',
    foreignField: 'authorId',
    justOne: false
})

module.exports = mongoose.model('Author', authorSchema, "authors");