'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { Question } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

router.get('/questions', (req, res) => {
    console.log(Question, "questions")
    return Question.find().then(question => res.json(question)
)})

module.exports = { router };