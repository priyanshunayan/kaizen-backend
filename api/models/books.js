const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  toread: [{
    name: String,
    authors: [String],
    description: String,
    thumbnail: String,
    subtitle: String,
  }],
  read: [{
    name: String,
    authors: [String],
    description: String,
    thumbnail: String,
    subtitle: String,
  }],
  favourite: [{
    name: String,
    authors: [String],
    description: String,
    thumbnail: String,
    subtitle: String,
  }],
})

module.exports = mongoose.model('books', bookSchema);
