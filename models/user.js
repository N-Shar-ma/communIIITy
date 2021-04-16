const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    upvotedQuestions: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question"
    }],
    upvotedAnswers: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Question"
    }]
})

module.exports = mongoose.model("User", userSchema)