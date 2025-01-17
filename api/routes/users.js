const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const Books = require('../models/books');
router.post('/signup', (req, res, next) => {
      User.find({
          email: req.body.email
        }).exec().then(user => {
            if (user.length >= 1) {
              res.status(400).json({
                message: "email exists"
              })
            } else {
              bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                  res.status(400).json({
                    message: err
                  })
                } else {
                  const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash,
                    username: req.body.username,
                    name: req.body.name
                  })

                  user.save().then(user => {
                    const books = new Books({
                      _id: mongoose.Types.ObjectId(),
                      userId: user._id,
                      toread: [],
                      read: [],
                      favourite: []
                    });
                    books.save((err, savedBook) => {
                        if (err) {
                          res.status(500).json({
                            message: err
                          })
                        } else {
                          const token = jwt.sign({
                              email: req.body.email,
                              password: req.body.password
                            },
                            'secret', {
                              expiresIn: '1h'
                            }
                          )
                          res.status(201).json({
                            message: "User created",
                            token: token,
                            user: user,
                            book: savedBook
                          })
                        }
                      })
                      .catch(err => {
                        res.status(500).json({
                          message: err
                        })
                      })
                  })
                }
              })
            }})});
              router.post('/login', (req, res, next) => {
                User.find({
                    email: req.body.email,
                  }).exec()
                  .then(user => {
                    if (user.length < 1) {
                      res.status(401).json({
                        message: "Auth failed"
                      })
                    }
                    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                      if (err) {
                        res.status(401).json({
                          message: 'Auth failed'
                        })
                      }
                      if (result) {
                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                          },
                          'secret', {
                            expiresIn: "1h"
                          }
                        )
                        return res.status(200).json({
                          message: "Logged in Successfully",
                          token: token,
                          user: user[0],

                        })
                      }
                      res.status(401).json({
                        message: 'Auth failed'
                      })
                    })
                  })
                  .catch(e => {
                      res.status(500).json({
                        error: e
                      })
                    }

                  )
              });
              router.get('/:username',(req, res, next) => {
                User.findOne({
                  username: req.params.username
                }).exec().then(user => {
                    const userId = user._id
                    return Books.findOne({
                      userId: userId
                    }).exec();
                }).then((book) => {
                    res.status(200).json({
                      read: book.read,
                      favourites: book.favourite
                    });
                }).catch(e => console.log(e));
              })
              module.exports = router;
