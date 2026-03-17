import Task from "./task.js"

function addTaskGui(){
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
    const dateContainer = document.createElement("div")
    dateContainer.className = "input-container"
    const dateInput = document.createElement("input")
    dateInput.setAttribute("type","date")
    dateInput.setAttribute("name","date")
    dateInput.setAttribute("min",today.toISOString().split("T")[0])
    dateInput.setAttribute("id","date")
    dateInput.className = "date-input"
    const dateLabel = document.createElement("label")
    dateLabel.setAttribute("for","date")
    dateLabel.textContent = "Due date:"
    dateLabel.className = "form-label"
    dateContainer.appendChild(dateLabel)
    dateContainer.appendChild(dateInput)


    taskForm.appendChild(titleContainer)
    taskForm.appendChild(descriptContainer)
    taskForm.appendChild(dateContainer)
    const contentSpace = document.querySelector(".content")
    contentSpace.appendChild(taskForm)

}

export default addTaskGui