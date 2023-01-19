const form = document.querySelector("form")
const ul = document.querySelector(".list")
const tasks = ul.children
const errorCreate = document.createElement("p")
let numberTask = 1

const errorRemove = (classItem1, classItem2, element) => {
  errorCreate.classList.remove(classItem1)
  form.createTask.classList.remove(classItem2)
  element.remove()
}

const errorAdd = (classItem1, classItem2, element, textElement) => {
  errorCreate.classList.add(classItem1)
  form.createTask.classList.add(classItem2)
  form.createTask.insertAdjacentElement("afterend", element)
  errorCreate.textContent = textElement
}

const resetInputsAndList = () => {
  const istTasksList = Array.from(tasks)
  form.createTask.value = ""
  form.searchTask.value = ""
  istTasksList.map((item) => (item.style.display = "flex"))
}

const createNewElementList = (text) => {
  numberTask++
  const task = `<li>
  <input type="checkbox" name="task" id="task${numberTask}"> 
  <label for="task${numberTask}"></label>
  <span class="text">${text}</span> 
  <span class="button-delete">x</span></li>`
  ul.innerHTML += task
  ul.scrollBy({
    top: 100,
    left: 0,
    behavior: "smooth",
  })
}

const submitTask = (event) => {
  event.preventDefault()
  const inputCreateTaskValue = form.createTask.value
  const inputRegex = /^[a-zA-Z0-9]{1,}$/
  if (inputRegex.test(form.createTask.value)) {
    createNewElementList(inputCreateTaskValue)
    resetInputsAndList()
    return
  }

  errorAdd("errorCreate-text", "errorCreate-input", errorCreate, "invalid text")
  form.createTask.addEventListener("keyup", () => {
    errorRemove("errorCreate-text", "errorCreate-input", errorCreate)
  })
}

const buttonDeleteTask = ({ target }) => {
  const clickedOn = target.classList[0]
  if (clickedOn === "button-delete") {
    target.parentElement.remove()
  }
}

const searchingTask = ({ target }) => {
  const inputKey = target.value
  const istTasksList = Array.from(tasks)
  istTasksList
    .map((li) => li.querySelector(".text").textContent)
    .filter((textTask, index) => {
      const isResearched =
        inputKey === "" ||
        textTask === inputKey ||
        textTask.search(inputKey) !== -1
      if (isResearched) {
        istTasksList[index].style.display = "flex"
        return
      }
      istTasksList[index].style.display = "none"
    })
}

form.addEventListener("submit", submitTask)
ul.addEventListener("click", buttonDeleteTask)
form.searchTask.addEventListener("keyup", searchingTask)
