const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const QuestionsSchema = mongoose.Schema({
    questions: {
        type: String,
    }

})



const Question = mongoose.models.Question || mongoose.model('Question', QuestionsSchema);

module.exports = { Question }