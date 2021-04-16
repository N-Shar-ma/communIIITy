if(process.env.NODE_ENV !== "production") require("dotenv").config()

const express = require("express")
const app = express()
const passport= require("passport")
const cookieSession = require("cookie-session")

const initializePassport = require("./passport-config")
initializePassport()

const indexRouter = require("./routes/index")
// const questionsRouter = require("./routes/questions")
// const profilesRouter = require("./routes/profiles")

app.set("view engine", "pug")
app.set("views", __dirname + "/pug")

app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieSession({
    maxAge: 24*60*60*1000, // milliseconds of a day
    keys:[process.env.COOKIE_KEY]
}));  
app.use(passport.initialize());
app.use(passport.session());

const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true, useUnifiedTopology : true })
const db = mongoose.connection
db.on("error", err => console.error(err))
db.once("open", () => console.log("connected to Pranav's database"))

app.use("/", indexRouter)
// app.use("/questions", questionsRouter)
// app.use("/profiles", profilesRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log("listening at http://localhost:3000/ in development")
})

