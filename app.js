const form = document.querySelector('form')
const ul = document.querySelector('.list')
const tasks = ul.children
const errorCreate = document.createElement('p')
let numberTask = 1

form.addEventListener('submit', event => {
  event.preventDefault()
  numberTask++
  const inputCreateTask = form.createTask
  const inputRegex = /^[a-zA-Z0-9]{1,}$/
  if(inputRegex.test(form.createTask.value)){
    const task = `<li>
          <input type="checkbox" name="task" id="task${numberTask}"> 
          <label for="task${numberTask}"></label>
          <span class="text">${inputCreateTask.value}</span> 
          <span class="button-delete">x</span></li>` 
      ul.innerHTML += task
      ul.scrollBy({
        top:100,
        left:0,
        behavior: 'smooth'
      })
      const istTasksList = Array.from(tasks)
      form.createTask.value = ''
      form.searchTask.value = ''
      istTasksList.forEach((_,index) => istTasksList[index].style.display = 'flex')
      errorCreate.classList.remove('errorCreate-text')
      form.createTask.classList.remove('errorCreate-input')
      return
    }
    errorCreate.textContent = 'invalid text'
    errorCreate.classList.add('errorCreate-text')
    form.createTask.classList.add('errorCreate-input')
    form.createTask.insertAdjacentElement('afterend', errorCreate)
    console.log('ola2')
    form.createTask.addEventListener('keyup', () => {
      errorCreate.classList.remove('errorCreate-text')
      form.createTask.classList.remove('errorCreate-input')
      errorCreate.remove()
      console.log('ola')
    })
})


ul.addEventListener('click', event  => {
  const clickedOn = event.target.classList[0]
  if(clickedOn === 'button-delete'){
    event.target.parentElement.remove()
  }
})

form.searchTask.addEventListener('keyup', event => {
  const inputKey = event.target.value
  const istTasksList = Array.from(tasks)
  istTasksList
    .map( (li) => li.querySelector('.text').textContent)
    .filter((textTask, index) => {
      const isResearched = inputKey === '' || textTask === inputKey || textTask.search(inputKey) !== -1
      if(isResearched){
        istTasksList[index].style.display = 'flex'
        return
      }
      istTasksList[index].style.display = 'none'
  })
})

