'use strict';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuestionsSchema = mongoose.Schema({
<<<<<<< HEAD
  questions: {
    spanish: String,
    english: String,
=======
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
>>>>>>> master
  }
});

QuestionsSchema.methods.apiRepr = function() {
  const { spanish, english, id } = this;
  return { spanish, english, id };
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
