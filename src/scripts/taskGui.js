import Task from "./task.js"
import { lightFormat } from "date-fns"
import { storageAvailable, addItem, 
    getTodayItems, getUpcomingItems, 
    getCompletedItems, updateValue, getItem,
    deleteItem } from "./store.js"

/* This function renders the form for 
adding a task to local storage. Storage-based functions 
are imported from store.js */
export function addTaskGui(){
    clearPage()
    //form creation
    const taskForm = document.createElement("form")
    taskForm.setAttribute("method","post")
    taskForm.setAttribute("action","#")
    taskForm.className = "create-form"

    //text inputs

    //title field
    const titleContainer = document.createElement("div")
    titleContainer.className = "input-container"
    const titleInput = document.createElement("input")
    titleInput.setAttribute("type","text")
    titleInput.setAttribute("name","title")
    titleInput.setAttribute("id","title")
    titleInput.className = "title-input"
    const titleLabel = document.createElement("label")
    titleLabel.setAttribute("for","title")
    titleLabel.textContent = "Title:"
    titleLabel.className = "form-label"
    titleContainer.appendChild(titleLabel)
    titleContainer.appendChild(titleInput)

    //description field
    const descriptContainer = document.createElement("div")
    descriptContainer.className = "input-container"
    const descriptInput = document.createElement("input")
    descriptInput.setAttribute("type","text")
    descriptInput.setAttribute("name","descript")
    descriptInput.setAttribute("id","descript")
    descriptInput.className = "text-input"
    const descriptLabel = document.createElement("label")
    descriptLabel.setAttribute("for","descript")
    descriptLabel.textContent = "Description:"
    descriptLabel.className = "form-label"
    descriptContainer.appendChild(descriptLabel)
    descriptContainer.appendChild(descriptInput)

    //due date field
    const today = new Date()
    today.setHours(0,0,0,0)
    const dateContainer = document.createElement("div")
    dateContainer.className = "input-container"
    const dateInput = document.createElement("input")
    dateInput.setAttribute("type","date")
    dateInput.setAttribute("name","date")
    //convert date to string, remove time from end of string
    dateInput.setAttribute("min",today.toISOString().split("T")[0])
    dateInput.setAttribute("id","date")
    dateInput.className = "date-input"
    const dateLabel = document.createElement("label")
    dateLabel.setAttribute("for","date")
    dateLabel.textContent = "Due date:"
    dateLabel.className = "form-label"
    dateContainer.appendChild(dateLabel)
    dateContainer.appendChild(dateInput)

    //priority field
    const priorityContainer = document.createElement("div")
    priorityContainer.className = "input-container"
    const priorityInput = document.createElement("select")
    priorityInput.id = "priority"
    const optionHolder = document.createElement("option")
    optionHolder.value = ""
    optionHolder.textContent = "-- Please select an option --"
    priorityInput.appendChild(optionHolder)
    const optionHigh = document.createElement("option")
    optionHigh.value = "1"
    optionHigh.textContent = "High"
    priorityInput.appendChild(optionHigh)
    const optionMid = document.createElement("option")
    optionMid.value = "2"
    optionMid.textContent = "Medium"
    priorityInput.appendChild(optionMid)
    const optionLow = document.createElement("option")
    optionLow.value = "3"
    optionLow.textContent = "Low"
    priorityInput.appendChild(optionLow)
    const priorityLabel = document.createElement("label")
    priorityLabel.setAttribute("for","priority")
    priorityLabel.textContent = "Priority:"
    priorityLabel.className = "form-label"
    priorityContainer.appendChild(priorityLabel)
    priorityContainer.appendChild(priorityInput)

    //notes field
    const notesContainer = document.createElement("div")
    notesContainer.className = "input-container"
    const notesInput = document.createElement("textarea")
    notesInput.setAttribute("name","notes")
    notesInput.setAttribute("rows","5")
    notesInput.setAttribute("cols","33")
    notesInput.setAttribute("id","notes")
    notesInput.className = "text-input"
    const notesLabel = document.createElement("label")
    notesLabel.setAttribute("for","notes")
    notesLabel.textContent = "Notes:"
    notesLabel.className = "form-label"
    notesContainer.appendChild(notesLabel)
    notesContainer.appendChild(notesInput)

    //button container
    const btnContainer = document.createElement("div")
    btnContainer.className = "form-buttons"

    //clear button
    const clearBtn = document.createElement("button")
    clearBtn.setAttribute("type","button")
    clearBtn.textContent = "Clear"
    clearBtn.className = "button clear"

    clearBtn.addEventListener("click", () => {
        taskForm.reset()
    })

    //submit button
    const submitBtn = document.createElement("button")
    submitBtn.setAttribute("type","submit")
    submitBtn.textContent = "Submit"
    submitBtn.className = "button submit"

    taskForm.addEventListener("submit", (e) => {
        e.preventDefault()

        let task = {}; 

        console.log(new Date(Date.parse(dateInput.value)))
        
        try {
            task = new Task(
                titleInput.value,
                descriptInput.value,
                new Date(Date.parse(dateInput.value)),
                priorityInput.value,
                notesInput.value,
            )

            if(storageAvailable("localStorage")){
                addItem("task", task)
            } 

            taskForm.reset()
        } catch (err) {
            console.log(err.message)
        }
        
       
        
    })

    taskForm.appendChild(titleContainer)
    taskForm.appendChild(descriptContainer)
    taskForm.appendChild(dateContainer)
    taskForm.appendChild(priorityContainer)
    taskForm.appendChild(notesContainer)
    btnContainer.appendChild(clearBtn)
    btnContainer.appendChild(submitBtn)
    taskForm.appendChild(btnContainer)
    const contentSpace = document.querySelector(".content")
    contentSpace.appendChild(taskForm)

}

/* renders the task cards based 
on a given list of tasks. Specific view functions
are given below this function */
export function renderTasks(taskList) {
    const cardsContainer = document.createElement("div")
    cardsContainer.className = "cards-container"

    const contentSpace = document.querySelector(".content")
    contentSpace.appendChild(cardsContainer)

    for(const task of taskList){
        //card container
        const newCard = document.createElement("div")
        newCard.className = "task-card"
        newCard.id = "c"+task._id

        cardsContainer.appendChild(fillTaskCard(newCard, task))
        
    }
}

export function todayTasksGui(){
    clearPage()
    const todayTasks = getTodayItems("task")

    if(todayTasks){
        const sortedTasks = todayTasks.sort((a,b) => a._priority - b._priority)

        renderTasks(sortedTasks)
    }  
}

export function upcomingTasksGui() {
    clearPage()
    const upcomingTasks = getUpcomingItems("task")

    if(upcomingTasks){
        const sortedTasks = upcomingTasks.sort((a, b) => {
        const dateDiff = new Date(a._dueDate) - new Date(b._dueDate)
  
        if (dateDiff !== 0) {
            return dateDiff   // sort by date first
        }

        return a._priority - b._priority   // if same date, sort by priority
        })

    renderTasks(sortedTasks)
    }
}

export function completedTasksGui() {
    clearPage()
    const completedTasks = getCompletedItems("task")

    if(completedTasks){
        const sortedTasks = completedTasks.sort((a, b) => {
        const dateDiff = new Date(a._dueDate) - new Date(b._dueDate)

        if (dateDiff !== 0) {
            return dateDiff   // sort by date first
        }

        return a._priority - b._priority   // if same date, sort by priority
        })

    renderTasks(sortedTasks)
    }
    
}

export function clearPage(){
    const contentSpace = document.querySelector(".content")
    contentSpace.innerHTML = ""
}

function renderEditTask(id, task){
    const cardContainer = document.querySelector("#c"+id)

    cardContainer.textContent = ""

    const taskForm = document.createElement("form")
    taskForm.setAttribute("method","post")
    taskForm.setAttribute("action","#")
    cardContainer.appendChild(taskForm)

    //card header container
    const cardHeader = document.createElement("div")
    cardHeader.className = "task-head"
    taskForm.appendChild(cardHeader)

    //task title
    const titleInput = document.createElement("input")
    titleInput.type = "text"
    titleInput.id = "t"+task._id
    titleInput.value = task._title
    titleInput.className = "task-input"
    cardHeader.appendChild(titleInput)

    /* Task due date input - date select appears on
    mouseover so that a placeholder can be shown */
    const today = new Date()
    today.setHours(0,0,0,0)
    const dateInput = document.createElement("input")
    dateInput.setAttribute("min",today.toISOString().split("T")[0])
    console.log(task._dueDate)
    dateInput.type = "date"
    dateInput.id = "d"+task._id
    dateInput.className = "task-sub"
    
    cardHeader.appendChild(dateInput)
    dateInput.value = new Date(task._dueDate)
        .toISOString()
        .split("T")[0]

    //task completed checkbox
    const checkedContainer = document.createElement("div")
    checkedContainer.className = "checkbox"
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type","checkbox")
    checkbox.className = "check-task"
    if(task._checked === true){
        checkbox.checked = true
    }
    const checkboxLabel = document.createElement("label")
    checkboxLabel.className = "card-label"
    checkboxLabel.id = "c"+task._id

    checkboxLabel.appendChild(checkbox)
    checkboxLabel.appendChild(document.createTextNode("Completed?"))
    checkedContainer.appendChild(checkboxLabel)
    cardHeader.appendChild(checkedContainer)

    //task information container
    const cardInfo = document.createElement("div")
    cardInfo.className = "task-info"
    taskForm.appendChild(cardInfo)

    //task description
    const taskDescription = document.createElement("input")
    taskDescription.type = "text"
    taskDescription.id = "de"+task._id
    taskDescription.value = task._description
    taskDescription.className = "task-text"
    cardInfo.appendChild(taskDescription)

    //task priority
    const priorityContainer = document.createElement("div")
    priorityContainer.className = "edit-container"
    const priorityInput = document.createElement("select")
    priorityInput.id = "p"+task._id
    const optionHolder = document.createElement("option")
    optionHolder.value = task._priority
    optionHolder.textContent = `-- ${task._priority == "1" ? "High" :
        task._priority == "2" ? "Medium" : "Low"} --`
    priorityInput.appendChild(optionHolder)
    const optionHigh = document.createElement("option")
    optionHigh.value = "1"
    optionHigh.textContent = "High"
    priorityInput.appendChild(optionHigh)
    const optionMid = document.createElement("option")
    optionMid.value = "2"
    optionMid.textContent = "Medium"
    priorityInput.appendChild(optionMid)
    const optionLow = document.createElement("option")
    optionLow.value = "3"
    optionLow.textContent = "Low"
    priorityInput.appendChild(optionLow)
    
    priorityContainer.appendChild(priorityInput)
    cardInfo.appendChild(priorityContainer)

    //task notes container
    const cardFooter = document.createElement("div")
    cardFooter.className = "card-footer"
    taskForm.appendChild(cardFooter)

    const cardNotes = document.createElement("div")
    cardNotes.className = "card-notes"
    cardFooter.appendChild(cardNotes)

    //task notes label
    const notesLabel = document.createElement("h5")
    notesLabel.textContent = "Notes:"
    notesLabel.className = "task-sub"
    cardNotes.appendChild(notesLabel)
        
    //task notes content
    const notesContent = document.createElement("input")
    if(task._notes){
        notesContent.value = task._notes
    } else {
        notesContent.value = "no notes recorded"
    }
    notesContent.className = "task-text"
    notesContent.id = "n"+task._id
    cardNotes.appendChild(notesContent)

    //save and cancel buttons
    const actionsContainer = document.createElement("div")
    actionsContainer.className = "btn-container"
        
    const saveBtn = document.createElement("button")
    saveBtn.className = "posi"
    saveBtn.textContent = "save"
    actionsContainer.appendChild(saveBtn)

    //update task on save click, re-render correct item set
    saveBtn.addEventListener("click", () => {
        const today = new Date()
        today.setHours(0,0,0,0)
        const dateInput = document.querySelector("#d"+task._id)
        const setDate = new Date(Date.parse(dateInput.value))
        updateValue("task", task._id, "_title", titleInput.value)
        updateValue("task", task._id, "_description", taskDescription.value)
        updateValue("task", task._id, "_dueDate", setDate
            .toISOString()
            .split("T")[0])
        updateValue("task", task._id, "_priority", priorityInput.value 
            ? priorityInput.value : task._value)
        updateValue("task", task._id, "_notes", notesContent.value)
        updateValue("task", task._id, "_checked", checkbox.checked)
        
        const updatedTask = getItem("task", task._id)
       
        updateTaskCard(updatedTask)
        
    })

    const cancelBtn = document.createElement("button")
    cancelBtn.className = "delete"
    cancelBtn.textContent = "cancel"
    actionsContainer.appendChild(cancelBtn)

    cancelBtn.addEventListener("click", () => {
        updateTaskCard(task)
    })
    cardFooter.appendChild(actionsContainer)
        

}

function updateTaskCard(task){
    const currentCard = document.querySelector("#c"+task._id)
    
    currentCard.innerHTML = ""
    fillTaskCard(currentCard, task)

}

function fillTaskCard(cardContainer, task){
    //card header container
        const cardHeader = document.createElement("div")
        cardHeader.className = "task-head"
        cardContainer.appendChild(cardHeader)

        //task title
        const taskTitle = document.createElement("h3")
        taskTitle.textContent = task._title
        taskTitle.className = "card-title"
        if(task._checked === true){
            const strike = document.createElement("s")
            strike.id = "s"+task._id
            strike.appendChild(taskTitle)
            cardHeader.appendChild(strike)
        } else {
            cardHeader.appendChild(taskTitle)
        }
        
        //task due date
        const taskDate = document.createElement("h4")
        taskDate.textContent = lightFormat(task._dueDate, "dd-MM-yy")
        taskDate.className = "task-sub"
        cardHeader.appendChild(taskDate)

        //task completed checkbox
        const checkedContainer = document.createElement("div")
        checkedContainer.className = "checkbox"
        const checkbox = document.createElement("input")
        checkbox.setAttribute("type","checkbox")
        checkbox.id = "check-task"
        if(task._checked === true){
            checkbox.checked = true
        }
        const checkboxLabel = document.createElement("label")
        checkboxLabel.htmlFor = "check-task"
        checkboxLabel.className = "card-label"
        checkboxLabel.textContent = "Completed?"

        //add a strikethrough to title if checkbox is checked
        checkbox.addEventListener("change", () => {
            if(checkbox.checked){
                task._checked = true
                updateValue("task", task._id, "_checked", true)
                const strike = document.createElement("s")
                strike.id = "s"+task._id
                cardHeader.replaceChild(strike, taskTitle)
                strike.appendChild(taskTitle)

            } else {
                task._checked = false
                updateValue("task", task._id, "_checked", false)
                const strike = document.querySelector("#s"+task._id)
                strike.remove()
                cardHeader.insertBefore(taskTitle, cardHeader.firstChild)

                console.log(task)
            }
        })

        checkedContainer.appendChild(checkbox)
        checkedContainer.appendChild(checkboxLabel)
        cardHeader.appendChild(checkedContainer)

        //task information container
        const cardInfo = document.createElement("div")
        cardInfo.className = "task-info"
        cardContainer.appendChild(cardInfo)

        //task description
        const taskDescription = document.createElement("p")
        taskDescription.textContent = task._description
        taskDescription.className = "task-text"
        cardInfo.appendChild(taskDescription)

        //task priority
        const taskPriority = document.createElement("p")
        taskPriority.textContent = task._priority == "1" ? "High" :
            task._priority == "2" ? "Medium" : "Low"
        taskPriority.className = "priority"
        cardInfo.appendChild(taskPriority)

        //task notes container
        const cardFooter = document.createElement("div")
        cardFooter.className = "card-footer"
        cardContainer.appendChild(cardFooter)

        const cardNotes = document.createElement("div")
        cardNotes.className = "card-notes"
        cardFooter.appendChild(cardNotes)

        //task notes label
        const notesLabel = document.createElement("h5")
        notesLabel.textContent = "Notes:"
        notesLabel.className = "task-sub"
        cardNotes.appendChild(notesLabel)
        
        //task notes content
        const notesContent = document.createElement("p")
        if(task._notes){
            notesContent.textContent = task._notes
        } else {
            notesContent.textContent = "no notes recorded"
        }
        notesContent.className = "task-text"
        cardNotes.appendChild(notesContent)

        //edit and delete buttons
        const actionsContainer = document.createElement("div")
        actionsContainer.className = "btn-container"
        

        const editBtn = document.createElement("button")
        editBtn.className = "edit"
        editBtn.textContent = "edit"
        actionsContainer.appendChild(editBtn)

        editBtn.addEventListener("click", () => {
            renderEditTask(task._id, task)
        })

        const deleteBtn = document.createElement("button")
        deleteBtn.className = "delete"
        deleteBtn.textContent = "delete"
        
        actionsContainer.appendChild(deleteBtn)

        deleteBtn.addEventListener("click", () => {
            actionsContainer.innerHTML = ""

            const confirmText = document.createElement("p")
            confirmText.class = "confirm-text"
            confirmText.textContent = "Are you sure?"
            actionsContainer.appendChild(confirmText)

            const keepBtn = document.createElement("button")
            keepBtn.className = "posi"
            keepBtn.textContent = "keep"
            actionsContainer.appendChild(keepBtn)

            keepBtn.addEventListener("click", () => {
                updateTaskCard(task)
            })

            const confDeleteBtn = document.createElement("button")
            confDeleteBtn.className = "delete"
            confDeleteBtn.textContent = "delete"
            actionsContainer.appendChild(confDeleteBtn)

            confDeleteBtn.addEventListener("click", () => {
                deleteItem("task", task._id)
                cardContainer.remove()
            })            
        })
        cardFooter.appendChild(actionsContainer)
        
        //append card to page
        return cardContainer
}