'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const { Question } = require('./models');
const { User } = require('../users/models');
const router = express.Router();
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/next', jwtAuth, (req, res) => {
	User.findOne({ username: req.user.username })
		.then(user => {
			res.json(user.questions[user.head]);
			// console.log('user.questions[user.head]: ', user.questions[user.head]);
		})

		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Internal server error' });
		});
});

router.get('/', jwtAuth, (req, res) => {
	User.findOne({ username: req.user.username })
		.then(user => {
			res.json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Internal server error' });
		});
});

router.get('/questions', jwtAuth, (req, res) => {
	Question.find()
		.then(questions => {
			const allQuestions = questions.map(question => question);
			res.json(allQuestions);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ message: 'Internal server error' });
		});
});

// router.post('/answer', jwtAuth, (req, res) => {
// 	let response = User.findOne({ username: req.user.username })
// 		.then(user => {
// 			const answerIndex = user.head;
// 			console.log('answerIndex: ', answerIndex);
// 			const currentQuestion = user.questions[answerIndex];
// 			console.log('currentQuestion: ', currentQuestion);
// 			if (req.body.boolean === true) {
// 				currentQuestion.mValue *= 2;
// 			} else {
// 				currentQuestion.mValue += 1;
// 			}
// 			user.head = currentQuestion.next;
// 			console.log('user.head after boolean evaluation', user.head);

// 			let answeredNode;
// 			for (let i = 0; i < currentQuestion.mValue; i++) {
// 				// currentquestion index becomes currentQuestion.mValue
// 				let idx = currentQuestion.mValue;
// 				console.log('idx: ', idx);
// 				if (idx == null) {
// 					idx = user.questions.length - 1;
// 				}
// 				answeredNode = user.questions[idx];
// 				console.log('answeredNode: ', answeredNode);
// 			}
// 			currentQuestion.next = answeredNode.next;
// 			console.log('currentQuestion.next: ', currentQuestion.next);
// 			answeredNode.next = answerIndex;
// 			console.log('answeredNode.next: ', answeredNode.next);
// 			user.head = answeredNode.next;
// 			console.log('	user.head : ', user.head);
// 			return user.save();
// 		})
// 		.then(user => {
// 			res.status(200).json(user);
// 		});
// });

router.post('/answer', jwtAuth, (req, res) => {
	let response = User.findOne({ username: req.user.username })
		.then(user => {
			// console.log('user: ', user);
			const answerIndex = user.head;
			const currentQuestion = user.questions[answerIndex];
			if (req.body.boolean === true && user.head <= 9) {
				user.head += 1;
			}
			if (req.body.boolean === true && user.head > 9) {
				user.head = 0;
			}
			return user.save();
		})
		.then(user => {
			// console.log('user: ', user);
			res.status(200).json(user);
		});
});

module.exports = { router };
