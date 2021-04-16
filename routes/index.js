const express = require("express")
const router = express.Router()
const User = require("../models/user") 
const Question = require("../models/question") 
const Answer = require("../models/answer") 
const passport = require("passport")
const { checkAuthenticated, checkNotAuthenticated } = require("../middleware/auth")

router.get("/", checkAuthenticated, async (req, res) => {
	try {
		const pageSize = 10
		const questionCount = await Question.countDocuments().exec()
		const page = parseInt(req.query.page)>0 ? parseInt(req.query.page) : 1
		startIndex = pageSize*(page-1)
		const questions = await Question.find()
										.sort({ createdAt: "desc" })
										.skip(startIndex)
										.limit(pageSize)
										.exec()	
		let prevPage, nextPage
		if(page>1) prevPage = page - 1
		if(startIndex + pageSize < questionCount) nextPage = page + 1
		// console.log(`start at index ${startIndex}, page size is ${pageSize}, page number is ${page}`)
		res.render("index", { user: req.user, questions, prevPage, nextPage, currPage: page })
	} catch(e) {
		res.status(500).json(e);
	}
})

router.get("/auth/google/callback", passport.authenticate('google', {
	successRedirect: "/",
	failureRedirect: "/error"
}))

router.get("/auth/google", checkNotAuthenticated, passport.authenticate("google", {
	scope: ["profile", "email"]
}));

router.get("/error", (req, res) => {
	res.render("error")
})

router.get("/login", checkNotAuthenticated, (req, res) => {
	res.render("login")
})

router.get("/logout", checkAuthenticated, async (req, res) => {
	req.logOut()
	req.session=null
	res.redirect("/login")
})

// router.get("/delete", async (req, res) => { // dev only !! Remove before deploying !!
// 	await Answer.deleteMany();
// 	const questions = await Answer.find()
// 	res.json(questions)
// })

// router.get("/users", async (req, res) => { // dev only !! Remove before deploying !!
// 	const users = await User.find()
// 	res.json(users)
// })

// router.get("/ques", async (req, res) => { // dev only !! Remove before deploying !!
// 	const ques = await Question.find()
// 	res.json(ques)
// })

// router.get("/ans", async (req, res) => { // dev only !! Remove before deploying !!
// 	const ans = await Answer.find()
// 	res.json(ans)
// })

module.exports = router