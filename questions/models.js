'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuestionsSchema = mongoose.Schema({
  questions: {
    type: String
  }
});

QuestionsSchema.methods.apiRepr = function() {
  return { questions: this.questions };
};

const Question =
  mongoose.models.Question || mongoose.model('Question', QuestionsSchema);

module.exports = { Question };
