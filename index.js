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
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { User } = require('./users/models');


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



// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
//   if (req.method === 'OPTIONS') {
//     return res.send(204);
//   }
//   next();
// });



app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: [
      "Bath Blue",
      "Barkham Blue",
      "Buxton Blue",
      "Cheshire Blue",
      "Devon Blue",
      "Dorset Blue Vinney",
      "Dovedale",
      "Exmoor Blue",
      "Harbourne Blue",
      "Lanark Blue",
      "Lymeswold",
      "Oxford Blue",
      "Shropshire Blue",
      "Stichelton",
      "Stilton",
      "Blue Wensleydale",
      "Yorkshire Blue"
  ]
  });
});

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
  dbConnect();
  runServer();
}

module.exports = { app, runServer, closeServer };
