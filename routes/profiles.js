const express = require("express")
const router = express.Router()
const User = require("../models/user")
const Question = require("../models/question")
const Answer = require("../models/answer")
const { checkAuthenticated } = require("../middleware/auth")

router.get("/:profileId", checkAuthenticated, async (req, res) => {
    try {
        const profileName = (await User.findById(req.params.profileId).exec()).name
        const questions = await Question.find({ author: req.params.profileId }).sort({ createdAt: "desc" }).exec()
        const answers = await Answer.find({ author: req.params.profileId }).sort({ createdAt: "desc" }).exec()
        const isDashboard = req.user.id===req.params.profileId ? true : false
        res.render("profile", { user: req.user, profileName, questions, answers, isDashboard })
    } catch(e) {
		res.status(404).redirect("/");
    }
})

module.exports = router