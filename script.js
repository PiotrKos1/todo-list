const TASKNAME = document.querySelector('#task')
const ADDTASKBTN = document.querySelector('.add-btn')
const TEXTEDIT = document.querySelector('#editText')
const SAVEBTN = document.querySelector('.save')
const CANCELBTN = document.querySelector('.cancel')
const TASKSPANEL = document.querySelector('.main')
const NOTASKSINFO = document.querySelector('.info')
const TASKNAMEERROR = document.querySelector('.error')
const POPUP = document.querySelector('.popup')
const TASKNAMEONLIST = document.getElementsByClassName('task-name')
let taskID = 0
let arr = []
let DIVTOEDIT;

const createTask = () => {
	const NEWDIV = document.createElement('div')
	NEWDIV.classList.add('task-panel')
	NEWDIV.setAttribute('id', taskID)
	TASKSPANEL.appendChild(NEWDIV)
	addTaskToArray(NEWDIV)
	NEWDIV.innerHTML = `<input type="checkbox" id="task-done" onchange="taskDone(${taskID})">
    <div class="task-panel-name">
    <p class="task-name">${TASKNAME.value}</p>
    </div>
    <div class="buttons">
    <button class="edit-btn" onclick="openPopup(${taskID})"><i class="bi bi-pencil-fill"></i></button>
    <button class="delete-btn" onclick="removeTask(${taskID})"><i class="bi bi-file-x-fill"></i></button>
    </div>`
	taskID++
	NOTASKSINFO.style.display = 'none'
	TASKNAME.value = ''
}

const removeTask = id => {
	const TASKTOREMOVE = document.getElementById(id)
	TASKSPANEL.removeChild(TASKTOREMOVE)
	const TASKTOREMOVEINDEX = arr.indexOf(TASKTOREMOVE)
	arr.splice(TASKTOREMOVE, 1)
	arr.length !== 0 ? (NOTASKSINFO.style.display = 'none') : (NOTASKSINFO.style.display = 'block')
}

const showTaskNameError = () => {
	TASKNAMEERROR.style.visibility = 'visible'
}

const clearTaskNameError = () => {
	TASKNAMEERROR.style.visibility = 'hidden'
}

const addTaskToArray = newdiv => {
	arr.push(newdiv)
}

const openPopup = id => {
	POPUP.style.display = 'flex'
	DIVTOEDIT = document.getElementById(id)
	const TEXTTOEDIT = DIVTOEDIT.childNodes[2].innerText

	TEXTEDIT.value = TEXTTOEDIT
}

const closePopup = () => {
	POPUP.style.display = 'none'
}

const saveEditText = () => {
	DIVTOEDIT.childNodes[2].innerHTML = `<div class="task-panel-name">
    
    <p class="task-name">${TEXTEDIT.value}</p>
    </div>`

	POPUP.style.display = 'none'
}

const taskDone = id => {
	const TEXTTASKDONE = document.getElementById(id)
	const TASKDONEINPUT = TEXTTASKDONE.childNodes[0]
	const TEXTTASKDONEEDIT = TEXTTASKDONE.childNodes[2]

	if (TASKDONEINPUT.checked) {
		console.log('ok')
		TEXTTASKDONEEDIT.style = 'text-decoration:line-through; color:grey;'
	} else {
		console.log('er')
		TEXTTASKDONEEDIT.style = 'text-decoration:none; color:black;'
	}
}

const addTask = () => {
	if (TASKNAME.value !== '') {
		createTask()
		clearTaskNameError()
	} else {
		showTaskNameError()
	}
}

ADDTASKBTN.addEventListener('click', addTask)
TASKNAME.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		addTask()
	}
})
TEXTEDIT.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		saveEditText()
	}
})
CANCELBTN.addEventListener('click', closePopup)
SAVEBTN.addEventListener('click', saveEditText)
