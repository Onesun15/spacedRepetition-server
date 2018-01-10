'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuestionsSchema = mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  id: {
    type: Number
  }
});

QuestionsSchema.methods.apiRepr = function() {
  const { question, answer, id } = this;
  return { question, answer, id };
};

const Question =
  mongoose.models.Question || mongoose.model('Question', QuestionsSchema);

module.exports = { Question };
