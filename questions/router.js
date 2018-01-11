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

router.get('/', jwtAuth, (req, res) => {
  // console.log(req.user, '+++++++++++++++++++++++++++++');
  User.findOne({ username: req.user.username })
    .then(user => {
      res.json(user.apiRepr());
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

let isCorrect = true;
//req.body.boolean
router.post('/answer', jwtAuth, (req, res) => {
  let response = User.findOne({ username: req.user.username }).then(user => {
    const questions = user.questions;
    const answerIndex = user.head;
    const currentQuestion = user.questions[answerIndex];
    if (isCorrect === true) {
      currentQuestion.mValue *= 2;
    } else {
      currentQuestion.mValue = 1;
    }
    user.head = currentQuestion.next;
    let answeredNode;
    for (let i = 0; i < currentQuestion.mValue; i++) {
      let idx = currentQuestion.next;
      if (idx == null) {
        idx = user.questions.length - 1;
      }
      answeredNode = user.questions[idx];
    }
    currentQuestion.next = answeredNode.next;
    answeredNode.next = answerIndex;
    return user.save();
  });
});

module.exports = { router };
