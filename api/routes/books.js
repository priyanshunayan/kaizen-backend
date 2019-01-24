const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/users');
const Books = require('../models/books');


router.post('/toread', (req, res, next) => {
    User.findById(req.body.userId).exec().then((user) => {
        const book = new Books({
            _id: mongoose.Types.ObjectId(),
            name: req.body.name,
            authors: req.body.authors,
            subtitle: req.body.subtitle,
            thumbnail: req.body.thumbnail,
            description: req.body.description,
            userId: req.body.userId
        });
        book.save((err, book) => {
            if(err) {
                throw err;
            } else {
                user.toread.push(book._id);
                res.status(200).json({
                    message: "Book Added Suuccessfully",
                    data: user
                })
            }
        })
    })
})

module.exports = router;