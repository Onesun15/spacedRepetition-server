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


router.get('/next', jwtAuth, (req, res) => {
  User.findOne({ username: req.user.username })
    .then(user => {
      res.json(user.questions[user.head]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


router.get('/', jwtAuth, (req, res) => {
  User.findOne({ username: req.user.username })
    .then(user => {
      res.json(user.apiRepr());
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


router.post('/answer', jwtAuth, (req, res) => {
  let response = User.findOne({ username: req.user.username })
    .then(user => {
      const answerIndex = user.head;
      const currentQuestion = user.questions[answerIndex];
      if (req.body.boolean === true) {
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
    })
    .then(user => {
      res.status(200).json(user.apiRepr());
    });
});

module.exports = { router };
