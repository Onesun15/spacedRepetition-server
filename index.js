require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const {PORT, CLIENT_ORIGIN, DATABASE_URL} = require('./config');
const {dbConnect} = require('./db-mongoose');
const mongoose = require('mongoose')


// const {dbConnect} = require('./db-knex');

const { router: usersRouter} = require('./users');
const { User } = require('./users/models');


const app = express();

app.use(bodyParser.json());

app.use('/api/users/', usersRouter);

app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.use(
    cors({
        origin: CLIENT_ORIGIN,
    })
);

app.get('/test', (req, res) => { 
    return User.find().then(users => res.json(users.map(user => user.apiRepr()))) 
    .catch(err => res.status(500).json({message: 'Internal server error'})); });

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

module.exports = {app, runServer, closeServer};
