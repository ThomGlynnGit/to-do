import Task from "./task.js"
import { storageAvailable, getItems } from "./store.js"

export function addTaskGui(){
    //form creation
    const taskForm = document.createElement("form")
    taskForm.setAttribute("method","post")
    taskForm.setAttribute("action","#")

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
    const priorityInput = document.createElement("input")
    priorityInput.setAttribute("type","number")
    priorityInput.setAttribute("name","priority")
    priorityInput.setAttribute("min","1")
    priorityInput.setAttribute("max","10")
    priorityInput.setAttribute("id","priority")
    priorityInput.className = "number-input"
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
        
        try {
            task = new Task(
                titleInput.value,
                descriptInput.value,
                new Date(Date.parse(dateInput.value)),
                priorityInput.value,
                notesInput.value,
            )
        } catch (err) {
            console.log(err.message)
        }
        
        if(storageAvailable("localStorage")){
            localStorage.setItem("task", JSON.stringify(task))
        } 

        taskForm.reset()
        
    })


    taskForm.appendChild(titleContainer)
    taskForm.appendChild(descriptContainer)
    taskForm.appendChild(dateContainer)
    taskForm.appendChild(priorityContainer)
    taskForm.appendChild(notesContainer)
    taskForm.appendChild(clearBtn)
    taskForm.appendChild(submitBtn)
    const contentSpace = document.querySelector(".content")
    contentSpace.appendChild(taskForm)

}

export function todayTasksGui(){
    console.log(getItems("task"))
}