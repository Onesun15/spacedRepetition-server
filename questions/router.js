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

router.get('/next', jwtAuth, (req, res) => {
// console.log(req.user, '+++++++++++++++++++++++++++++');
  User.findOne({username: req.user.username})
    .then(user => {
      res.json(user.questions[user.head]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

let testResponse = false;

router.post('/answer', jwtAuth, (req, res) => {
  let response = 

  User.findOne({username: req.user.username})
  .then(user => {
    // console.log(user, 'user')
    let questions = user.questions
    // console.log(questions, 'questions')
    let currentQuestion = user.questions[user.head]
    let mValue = user.questions[user.head].mValue;
    // console.log(mValue, 'mvalue')
    if (mValue.length>questions.length){
      currentQuestion = currentQuestion + 1
    }
    if(testResponse === true){
      currentQuestion = user.questions[user.head + 1]
      mValue *= 2;
      // console.log(mValue, 'mValue')
    }
    if(testResponse === false){
      currentQuestion = user.questions[user.head + 1]
      mValue = 1;
      // console.log(mValue, 'false mValue')
    }
    
      user.head = currentQuestion.next
    // console.log(currentQuestion.next, user.head,'head', 'currentQuestion++++++++')
    // console.log(user, 'user++++++++++++++')
    return user.save()
  })
})

    //router.post('/userAnswer'){
        // get back whether answer is correct or not
        // verified in front end whether answered correctly
        // here we do a check, if (req.body.isCorrect) mValue = *2 else mValue = 1 
        // (if mValue.length>arr.lenght), user.head = question.next, 
        // need to add node === to current position
        // return User.save()
    // } 




module.exports = { router };
