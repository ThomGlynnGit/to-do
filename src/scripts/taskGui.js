import Task from "./task.js"

function addTaskGui(){
    //form creation
    const taskForm = document.createElement("form")
    taskForm.setAttribute("method","post")
    taskForm.setAttribute("action","#")

    //text inputs

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

    taskForm.appendChild(descriptContainer)
    const contentSpace = document.querySelector(".content")
    contentSpace.appendChild(taskForm)

}

export default addTaskGui