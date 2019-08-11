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
    //TODO Make a check for only distinct books to be stored -- NOT SO IMPORTANT
    //console.log(book);
    // const index = book.toread.indexOf(req.body.toread);
    req.body.toread.isFavourite = false;
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
    //TODO Make a check for only distinct books to be stored -- NOT SO IMPORTANT
    req.body.read.isFavourite = false;
    book.read.push(req.body.read);
    //TODO if the book existed in the read array then remove from there.
    //Check if book existed;

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
    req.body.favourite.isFavourite = true;
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

router.put('/removefromread', (req, res, next) => {
  Books.findOne({
    userId: req.body.userId
  }).exec().then(book => {
    for (let i = 0; i < book.read.length; i++){
        if (book.read[i].title && book.read[i].title === req.body.title) {
        //  console.log(req.body.title);
            book.read.splice(i, 1);
            break;
        }
      }
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
router.put('/removefromtoread', (req, res, next) => {
  Books.findOne({
    userId: req.body.userId,
  }).exec().then(book => {
    for (let i = 0; i < book.toread.length; i++){
        if (book.toread[i].title && book.toread[i].title === req.body.title) {
            book.toread.splice(i, 1);
            break;
        }
      }
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
router.put('/removefromfavourite', (req, res, next) => {
  Books.findOne({
    userId: req.body.userId
  }).exec().then(book => {
    for (let i = 0; i < book.favourite.length; i++){
        if (book.favourite[i].title && book.favourite[i].title === req.body.title) {
          // console.log(req.body.title);
            book.favourite.splice(i, 1);
            break;
        }
      }

      for (let i = 0; i < book.read.length; i++){
        console.log(i,  book.read[i].title, req.body.title );
          if (book.read[i].title && book.read[i].title === req.body.title) {
            //console.log(req.body.title);
              book.read[i].isFavourite = false;
              console.log("PLEASE MAKE IT FALSE", book.read[i].isFavourite)
              break;
          }
        }

    book.save((err, savedBook) => {
      if (err) {
        res.status(500).json({
          message: "An error occured"
        })
      } else {
        console.log("SAVED BOOK >>>>> ", savedBook);
        res.status(200).json({
          message: "Book Added successfully",
          data: savedBook
        })
      }
    })
  })
})
router.get('/toread/:userId', (req, res, next) => {
  Books.findOne({
    userId: req.params.userId
  }).exec().then((book) => {
    if(book.toread.length > 0){
      res.status(200).json({
        message: "Books retrieved successfully",
        data: book.toread
      })
    }else {
      res.status(200).json({
        message: "No books in reading list!"
      })
    }
  })
})
router.get('/read/:userId', (req, res, next) => {
  Books.findOne({
    userId: req.params.userId
  }).exec().then((book) => {
    if(book.read.length > 0){
      res.status(200).json({
        message: "Books retrieved successfully",
        data: book.read
      })
    }else {
      res.status(200).json({
        message: "You have read 0 Books."
      })
    }
  })
})
router.get('/favourite/:userId', (req, res, next) => {
  Books.findOne({
    userId: req.params.userId
  }).exec().then((book) => {
    if(book.favourite.length > 0){
      res.status(200).json({
        message: "Books retrieved successfully",
        data: book.favourite
      })
    }else {
      res.status(200).json({
        message: "No books in favourites"
      })
    }
  })
})
router.put('/finished', (req, res, next) => {
  Books.findOne({
    userId: req.body.userId
  }).exec().then((book) => {
    for (let i = 0; i < book.toread.length; i++){
        if (book.toread[i].title && book.toread[i].title === req.body.title) {
            book.read.push(book.toread[i]);
            book.toread.splice(i, 1);
            break;
        }
      }
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
  router.post('/favouritePush', (req, res, next) => {
  Books.findOne({
    userId: req.body.userId
  }).exec().then((book) => {
    for (let i = 0; i < book.read.length; i++){
        if (book.read[i].title && book.read[i].title === req.body.title) {
            book.read[i].isFavourite = true;
            book.favourite.push(book.read[i]);
            //book.toread.splice(i, 1);
            break;
        }
      }
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
