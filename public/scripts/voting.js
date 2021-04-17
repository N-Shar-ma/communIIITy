const quesUpvoteButton = document.querySelector("#questions_up_vote")
const quesVoteCountEl = document.querySelector("#questions_vote_count")
const questionId = quesUpvoteButton.parentElement.dataset.qid

quesUpvoteButton.addEventListener("click", upvoteQuestionClicked)

async function upvoteQuestionClicked() {
    quesUpvoteButton.classList.toggle("voted");
    const currentVoteCount = parseInt(quesVoteCountEl.innerText)
    let change = "up"
    if(!quesUpvoteButton.classList.contains("voted")) {
        change = "down"
        quesVoteCountEl.innerText = currentVoteCount - 1;
    } else {
        quesVoteCountEl.innerText = currentVoteCount + 1;
    }
    try {
        data = { change }
        await updateVoteBackend(data)
    } catch(e) {
        quesUpvoteButton.classList.toggle("voted");
        quesVoteCountEl.innerText = currentVoteCount
        console.log(e)
    }
}

const ansUpvoteButtons = [...document.querySelectorAll(".questions_answer_up_vote")]
ansUpvoteButtons.forEach(button => button.addEventListener("click", upvoteAnswerClicked))

async function upvoteAnswerClicked(e) {
    const ansVoteCountEl = e.currentTarget.nextElementSibling
    const answerId = e.currentTarget.parentElement.dataset.aid
    e.currentTarget.classList.toggle("voted")
    const currentVoteCount = parseInt(ansVoteCountEl.innerText)
    let change = "up"
    if(!e.currentTarget.classList.contains("voted")) {
        change = "down"
        ansVoteCountEl.innerText = currentVoteCount - 1;
    } else {
        ansVoteCountEl.innerText = currentVoteCount + 1;
    }
    try {
        data = { change }
        await updateVoteBackend(data, answerId)
    } catch(e) {
        ansUpvoteButton.classList.toggle("voted");
        ansVoteCountEl.innerText = currentVoteCount
        console.log(e)
    }
}
    
async function updateVoteBackend(data, answerId) {
    let url = `/questions/${questionId}/vote`
    if(answerId) url = `/questions/${questionId}/${answerId}/vote`
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if(!res.ok) {
        throw Error(res.status)
    }
}