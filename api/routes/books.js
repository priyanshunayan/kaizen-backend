const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/users');
const Books = require('../models/books');

//toadd the book in the toread array. 

router.post('/toread', (req, res, next) => {
  Books.findOne({
    userId: req.body.userId
  }).exec().then(book => {
    //TODO Make a check for only distinct books to be stored
    console.log(book);
    book.toread.push(req.body.toread);
    book.save((err, savedBook) => {
      if (err) {
        res.status(500).json({
          message: "An error occured"
        })
      } else {
        res.status(200).json({
          message: "Book Added successfully",
          data: savedBook
        })
      }
    })
  })
});

router.post('/read', (req, res, next) => {
  Books.findOne({
    userId: req.body.userId
  }).exec().then(book => {
    //TODO Make a check for only distinct books to be stored
    book.read.push(req.body.read);
    book.save((err, savedBook) => {
      if (err) {
        res.status(500).json({
          message: "An error occured"
        })
      } else {
        res.status(200).json({
          message: "Book Added successfully",
          data: savedBook
        })
      }
    })
  })

})

router.post('/favourite', (req, res, next) => {
  Books.findOne({
    userId: req.body.userId
  }).exec().then(book => {
    //TODO Make a check for only distinct books to be stored
    book.favourite.push(req.body.favourite);
    book.save((err, savedBook) => {
      if (err) {
        res.status(500).json({
          message: "An error occured"
        })
      } else {
        res.status(200).json({
          message: "Book Added successfully",
          data: savedBook
        })
      }
    })
  })

})

module.exports = router;
