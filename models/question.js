const mongoose = require("mongoose")
const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 350
    },
    body: {
        type: String,
        trim: true
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

module.exports = mongoose.model("Question", questionSchema)