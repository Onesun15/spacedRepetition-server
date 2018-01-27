'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const { PORT, CLIENT_ORIGIN, DATABASE_URL } = require('./config');

const { dbConnect } = require('./db-mongoose');
const mongoose = require('mongoose');

// const {dbConnect} = require('./db-knex');

const { router: usersRouter } = require('./users');
// const { router: questionsRouter } = require('./router')
const { router: questionsRouter } = require('./questions');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { User } = require('./users/models');
const { Question } = require('./questions/models');

passport.use(localStrategy);
passport.use(jwtStrategy);
const jwtAuth = passport.authenticate('jwt', { session: false });
const app = express();

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use(bodyParser.json());

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/questions', questionsRouter);


// app.get('/api/questions', (req, res) => {
//   return res.json({
//     data: [
//       "Bath Blue",
//       "Barkham Blue",
//       "Buxton Blue",
//       "Cheshire Blue",
//       "Devon Blue",
//       "Dorset Blue Vinney",
//       "Dovedale",
//       "Exmoor Blue",
//       "Harbourne Blue",
//       "Lanark Blue",
//       "Lymeswold",
//       "Oxford Blue",
//       "Shropshire Blue",
//       "Stichelton",
//       "Stilton",
//       "Blue Wensleydale",
//       "Yorkshire Blue"
//   ]
//   });
// });

// app.get('/api/protected', jwtAuth, (req, res) => {
//   return res.json({
//     data: [
//       "Bath Blue",
//       "Barkham Blue",
//       "Buxton Blue",
//       "Cheshire Blue",
//       "Devon Blue",
//       "Dorset Blue Vinney",
//       "Dovedale",
//       "Exmoor Blue",
//       "Harbourne Blue",
//       "Lanark Blue",
//       "Lymeswold",
//       "Oxford Blue",
//       "Shropshire Blue",
//       "Stichelton",
//       "Stilton",
//       "Blue Wensleydale",
//       "Yorkshire Blue"
//   ]
//   });
// });

const preguntas = [
  {
    question: 'casa',
    answer: 'house',
    id: 1
  },
  {
    question: 'hambre',
    answer: 'hunger',
    id: 2
  },
  {
    question: 'perro',
    answer: 'dog',
    id: 3
  },
  {
    question: 'hola',
    answer: 'hello',
    id: 4
  },
  {
    question: 'mundo',
    answer: 'world',
    id: 5
  },
  {
    question: 'grande',
    answer: 'big',
    id: 6
  },
  {
    question: 'izquierda',
    answer: 'left',
    id: 7
  },
  {
    question: 'durmiendo',
    answer: 'sleeping',
    id: 8
  },
  {
    question: 'mesa',
    answer: 'table',
    id: 9
  },
  {
    question: 'pajaro',
    answer: 'bird',
    id: 10
  }
];

const loadDatabase = questions => {
  Question.count({}).then(count => {
    if (count < 1) {
      console.log('database empty, seedData');
      Question.insertMany(questions).catch(e => console.log(e));
    }
  });
};

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  dbConnect().then(() => {
    console.log('connected to DB');
    loadDatabase(preguntas);
  });
  runServer();
}

module.exports = { app, runServer, closeServer };
