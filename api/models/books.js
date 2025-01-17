const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  toread: [{
    id:String,
    name: String,
    authors: [String],
    description: String,
    imageLinks: {
      thumbnail: String,
      small:String,
      medium:String
    },
    subtitle: String,
    title: String,
    isFavourite: Boolean
  }],
  read: [{
    id:String,
    name: String,
    authors: [String],
    description: String,
    imageLinks: {
      thumbnail: String,
      small:String,
      medium:String
    },
    subtitle: String,
    title: String,
    isFavourite: Boolean
  }],
  favourite: [{
    id:String,
    name: String,
    authors: [String],
    description: String,
    imageLinks: {
      thumbnail: String,
      small:String,
      medium:String
    },
    subtitle: String,
    title: String,
    isFavourite: Boolean
  }],
})
module.exports = mongoose.model('books', bookSchema);
