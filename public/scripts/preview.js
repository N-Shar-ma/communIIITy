const previewEl = document.querySelector("#preview")
const textAreaEl = document.querySelector("[name='body']")
textAreaEl.addEventListener("input", e => {
	previewEl.innerHTML = marked(textAreaEl.value, { sanitiser: true })
})