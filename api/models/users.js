const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String, 
        required:true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    password: {type: String, required: true},
    name: {type: String, required: true},
    toread: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'books'
    },
    read: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'books'
    },
    favourite: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'books'
    },
    username: {type: String, required: true}
})

module.exports = mongoose.model('Users', UserSchema);