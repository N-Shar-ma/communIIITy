const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Question = require("../models/question")
const Answer = require("../models/answer")
const { checkAuthenticated } = require("../middleware/auth")

const marked = require("marked")
const { JSDOM } = require("jsdom")
const dompurify = require("dompurify")(new JSDOM().window)

router.get("/new", checkAuthenticated, (req, res) => {
    res.render("new", { user: req.user })
})

router.get("/:questionId/:answerId", checkAuthenticated, async (req, res) => {
    try {
        const question = await getQuestionForTemplating(req.params.questionId, req.user)
        let answers = await getAnswersForTemplating(req.params.questionId, req.user)
        const highlightedAnswer = await Answer.findById(req.params.answerId).lean().exec()
        if(highlightedAnswer == null || highlightedAnswer.question != req.params.questionId) return res.redirect(`/questions/${req.params.questionId}`)
        answers = answers.map(answer => {
            if(answer._id==req.params.answerId) return {...answer, highlighted: true}
            else 
            return answer
        })
        // console.log(JSON.stringify(answers[0]))
        // res.json(answers)
        res.render("questions", { user: req.user, question, answers })
    } catch(e) {
        console.log(e)
		res.status(404).redirect("/")
    }
})

router.get("/:questionId", checkAuthenticated, async (req, res) => {
    try {
        const question = await getQuestionForTemplating(req.params.questionId, req.user)
        const answers = await getAnswersForTemplating(req.params.questionId, req.user)
        res.render("questions", { user: req.user, question, answers })
    } catch(e) {
        console.log(e)
        res.status(404).redirect("/")
    }
})

async function getAnswersForTemplating(questionId, user) {
    let answers = await Answer.find({ question: questionId }).sort({ voteCount: "desc" }).lean().exec()
    answers = answers.map(answer => {
        if(user.upvotedAnswers.includes(answer._id)) return {...answer, isUpvoted : true}
        else return answer
    })
    return answers
}

async function getQuestionForTemplating(questionId, user) {
    const question = await Question.findById(questionId).lean().exec()
    question.body = dompurify.sanitize(marked(question.body))
    if(user.upvotedQuestions.includes(question._id)) question.isUpvoted = true  
    return question  
}

router.post("/", checkAuthenticated, async (req, res) => {
    try {
        const question = await Question.create({ ...req.body, author: req.user.id, authorName: req.user.name })
        res.status(200).redirect(`/questions/${question.id}`)
    } catch(e) {
        console.log(e)
        res.redirect("/questions/new");
    }
})

router.post("/:questionId", checkAuthenticated, async (req, res) => {
    try {
        const answer = await Answer.create({ ...req.body, author: req.user.id, authorName: req.user.name, question: req.params.questionId })
        res.status(200).redirect(`/questions/${req.params.questionId}/${answer.id}`)
    } catch(e) {
        console.log(e)
        res.redirect(`/questions/${req.params.questionId}`)
    }
})

router.post("/:questionId/:answerId/vote", checkAuthenticated, async (req, res) => {
    try {
        const change = req.body.change
        const user = await User.findById(req.user.id).exec()
        const answer = await Answer.findById(req.params.answerId).exec()
        if(change=="up" && !user.upvotedAnswers.includes(answer.id)) {
            user.upvotedAnswers.push(answer.id)
            answer.voteCount = answer.voteCount + 1
        } else if(change==="down" && user.upvotedAnswers.includes(answer.id)) {
            user.upvotedAnswers = user.upvotedAnswers.filter(ansId => ansId!=answer.id)
            answer.voteCount = answer.voteCount - 1
        }
        await user.save()
        await answer.save()
        res.sendStatus(200)
    } catch(e) {
        res.sendStatus(500)
    }
})

router.post("/:questionId/vote", checkAuthenticated, async (req, res) => {
    try {
        const change = req.body.change
        const user = await User.findById(req.user.id).exec()
        const question = await Question.findById(req.params.questionId).exec()
        if(change=="up" && !user.upvotedQuestions.includes(question.id)) {
            user.upvotedQuestions.push(question.id)
            question.voteCount = question.voteCount + 1
        } else if(change==="down" && user.upvotedQuestions.includes(question.id)) {
            user.upvotedQuestions = user.upvotedQuestions.filter(quesId => quesId!=question.id)
            question.voteCount = question.voteCount - 1
        }
        await user.save()
        await question.save()
        res.sendStatus(200)
    } catch(e) {
        res.sendStatus(500)
    }
})

module.exports = router