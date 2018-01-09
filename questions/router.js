'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Question } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
  console.log('hello questions');
  return Question.find().then(question => res.json(question.map(question => question.apiRepr()))) 
    .catch(err => res.status(500).json({message: 'Internal server error'})); });

module.exports = { router };
