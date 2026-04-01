import { storageAvailable, getItems, addItem, 
    getRemainingTasks, getProjectTasks } from "./store.js"
import { clearPage, renderTasks } from "./taskGui.js"
import Project from "./project.js"

/* This function renders the form for 
adding a project to local storage. Storage-based functions 
are imported from store.js */
export function addProjectGui(){
    clearPage()
    //form creation
    const projectForm = document.createElement("form")
    projectForm.setAttribute("method","post")
    projectForm.setAttribute("action","#")
    projectForm.className = "create-form"

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

    //assign tasks
    const tasksContainer = document.createElement("div")
    tasksContainer.className = "input-container"
    const tasksInput = document.createElement("div")
    tasksInput.className = "tasks-container"
    const tasksLabel = document.createElement("h3")
    tasksLabel.textContent = "Tasks:"
    tasksLabel.style.fontWeight = "200"
    tasksLabel.className = "form-label"
    tasksContainer.appendChild(tasksLabel)
    tasksContainer.appendChild(tasksInput)

    const remainingTasks = getRemainingTasks()

    for(const task of remainingTasks){
        const optionContainer = document.createElement("div")
        optionContainer.className = "option-container"
        const option = document.createElement("input")
        option.type = "checkbox"
        option.value = task._id
        option.id = "t"+task._id
        const label = document.createElement("label")
        label.className = "task-label"
        label.for = "t"+task._id
        label.textContent = task._title
        label.appendChild(option)
        tasksInput.appendChild(label)
    }
    
    //button container
    const btnContainer = document.createElement("div")
    btnContainer.className = "form-buttons"

    //clear button
    const clearBtn = document.createElement("button")
    clearBtn.setAttribute("type","button")
    clearBtn.textContent = "Clear"
    clearBtn.className = "button clear"

    clearBtn.addEventListener("click", () => {
        projectForm.reset()
    })

    //submit button
    const submitBtn = document.createElement("button")
    submitBtn.setAttribute("type","submit")
    submitBtn.textContent = "Submit"
    submitBtn.className = "button submit"

    projectForm.addEventListener("submit", (e) => {
        e.preventDefault()

        let project = {}; 
        
        try {
            project = new Project(
                titleInput.value,
                descriptInput.value,
                getCheckedTasks(tasksInput)
            )

            if(storageAvailable("localStorage")){
                addItem("project", project)
            } 

            projectForm.reset()
            addProjectToSidebar(project)
        } catch (err) {
            console.log(err.message)
        }
        
        console.log(getItems("project"))
        
    })

    projectForm.appendChild(titleContainer)
    projectForm.appendChild(descriptContainer)
    projectForm.appendChild(tasksContainer)
    btnContainer.appendChild(clearBtn)
    btnContainer.appendChild(submitBtn)
    projectForm.appendChild(btnContainer)
    const contentSpace = document.querySelector(".content")
    contentSpace.appendChild(projectForm)

}

function getCheckedTasks(element) {
    const options = element.getElementsByTagName("input")
    const optionsList = []

    for(const option of options){
        if(option.checked === true){
            optionsList.push(option.value)
        }
    }

    return optionsList
}

function addProjectToSidebar(project){
    const projectNav = document.querySelector("#project-nav")

    const listElem = document.createElement("li")
    listElem.className = "filter"
    const projectBtn = document.createElement("button")
    projectBtn.id = "pb"+project._id
    projectBtn.textContent = project._title

    projectBtn.addEventListener("click", () => {
        clearPage()
        renderTasks(getProjectTasks(project._id))
    })

    listElem.appendChild(projectBtn)
    projectNav.insertBefore(listElem, projectNav.firstChild)

}
