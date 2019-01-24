const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    authors: [String],
    description: String,
    thumbnail: String,
    subtitle: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})
module.exports = mongoose.model('books', bookSchema);