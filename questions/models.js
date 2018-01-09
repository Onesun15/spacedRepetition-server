'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuestionsSchema = mongoose.Schema({
  spanish: {
    type: String,
    required: true
  },
  english: {
    type: String,
    required: true
  },
  id: {
    type: Number
  }
});

QuestionsSchema.methods.apiRepr = function() {
  const { spanish, english, id } = this;
  return { spanish, english, id };
};

const Question =
  mongoose.models.Question || mongoose.model('Question', QuestionsSchema);

module.exports = { Question };
