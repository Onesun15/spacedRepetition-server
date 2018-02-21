'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	// points to first item question array
	head: {
		type: Number,
		default: 0,
	},
	questions: [
		{
			question: String,
			answer: String,
			mValue: Number,
			next: Number,
		},
	],
});

UserSchema.methods.apiRepr = function() {
	return { username: this.username, questions: this.questions[this.head], head: this.head };
};

// UserSchema.methods.apiRepr = function() {
//   const { questions.question, answer, id } = this;
//   return { question, answer, id };
// };

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 10);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = { User };
