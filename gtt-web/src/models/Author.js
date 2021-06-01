const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const authorSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
    birth: String,
    death: String,
    image: String,
    nid: Number,
    popularAuthor: Boolean,
    quotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Quote'}],
    slug: {type: String, slug: ["firstName", "lastName"]}
});

/*
// https://mongoosejs.com/docs/populate.html#populate-virtuals
authorSchema.virtual('quotes', {
    ref: 'Quote',
    localField: '_id',
    foreignField: 'authorId',
    justOne: false
})
*/

module.exports = mongoose.model('Author', authorSchema, "authors");