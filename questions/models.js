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

let preguntas = [
    {
        "spanish": "casa",
        "english": "house",
        "id": 1
    },
    {
        "spanish": "hambre",
        "english": "hunger",
        "id": 2
    },
    {
        "spanish": "perro",
        "english": "dog",
        "id": 3
    },
    {
        "spanish": "hola",
        "english": "hello",
        "id": 4
    },
    {
        "spanish": "mundo",
        "english": "world",
        "id": 5
    },
    {
        "spanish": "grande",
        "english": "big",
        "id": 6
    },
    {
        "spanish": "izquierda",
        "english": "left",
        "id": 7
    },
    {
        "spanish": "durmiendo",
        "english": "sleeping",
        "id": 8
    },
    {
        "spanish": "mesa",
        "english": "table",
        "id": 9
    },
    {
        "spanish": "pajaro",
        "english": "bird",
        "id": 10
    },
]
