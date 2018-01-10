'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const { Question } = require('./models');
const { User } = require('../users/models');

const router = express.Router();

const jsonParser = bodyParser.json();

const jwtAuth = passport.authenticate('jwt', { session: false });

// add JWT tokent to params
// /nextquestion endpoint

router.get('/', (req, res) => {
// console.log(req.user, '+++++++++++++++++++++++++++++');
  User.findOne({username: req.users.answer})
    .then(user => {
      res.json(user.apiRepr());
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

// router.get('/', (req, res) => {
//   // change to use User.findOne() collection
//   return Question.find().then(question => res.json(question.map(question => question.apiRepr()))) 
//   // user.question[user.head]
//     .catch(err => res.status(500).json({message: 'Internal server error'})); });




    //router.post('/userAnswer'){
        // get back whether answer is correct or not
        // verified in front end whether answered correctly
        // here we do a check, if (req.body.isCorrect) mValue = *2 else mValue = 1 
        // (if mValue.length>arr.lenght), user.head = question.next, 
        // need to add node === to current position
        // return User.save()
    // } 




module.exports = { router };
