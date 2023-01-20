const form = document.querySelector("form")
const ul = document.querySelector(".list")
const todoList = ul.children
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

const resetList = () => Array.from(todoList)
  .map((item) => item.classList.remove('hidden'))

const createNewTodo = (inputValue) => {
  numberTask++
  ul.innerHTML += `<li class="task">
  <input type="checkbox" name="task" id="task${numberTask}"> 
  <label for="task${numberTask}"></label>
  <span class="text">${inputValue}</span> 
  <span class="button-delete">x</span></li>`
  ul.scrollTo({
    top: 10000,
    left: 0,
    behavior: "smooth",
  })
}

const submitTodos = (event) => {
  event.preventDefault()
  const inputCreateTaskValue = form.createTask.value.trim()
  const inputRegex = /^[a-zA-Z0-9]{1,}$/
  if(inputRegex.test(inputCreateTaskValue)) {
    createNewTodo(inputCreateTaskValue)
    resetList()
    event.target.reset()
    return
  }

  errorAdd("errorCreate-text", "errorCreate-input", errorCreate, "invalid text")
  form.createTask.addEventListener("keyup", () => {
    errorRemove("errorCreate-text", "errorCreate-input", errorCreate)
  })
}

const buttonDeleteTodos = ({ target }) => {
  const clickedOn = target.classList[0]
  if (clickedOn === "button-delete") {
    target.parentElement.remove()
  }
}

const filterTodos = (arrayTodo,inputValue, returnMatchedTodo) => arrayTodo
  .filter((task) => {
    const matchedTodos = task.querySelector(".text").textContent.toLowerCase().includes(inputValue)
    return returnMatchedTodo ? matchedTodos : !matchedTodos
  })

const hideTodos = (arrayTodo,inputValue) => {
  filterTodos(arrayTodo, inputValue, false)
  .forEach( item => item.classList.add('hidden'))
}

const showTodos = (arrayTodo,inputValue) => {
  filterTodos(arrayTodo, inputValue, true)
  .forEach( item => item.classList.remove('hidden'))
}

const searchingTodos = ({ target }) => {
  const inputKey = target.value.trim().toLowerCase()
  const isTodosList = Array.from(todoList)

  hideTodos(isTodosList, inputKey)
  showTodos(isTodosList, inputKey)
}

form.addEventListener("submit", submitTodos)
ul.addEventListener("click", buttonDeleteTodos)
form.searchTask.addEventListener("keyup", searchingTodos)
