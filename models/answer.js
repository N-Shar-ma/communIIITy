const mongoose = require("mongoose")
const answerSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    question: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Question"
    },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User"
    },
    authorName: {
        type: String,
        required: true
    },
    voteCount: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Answer", answerSchema)