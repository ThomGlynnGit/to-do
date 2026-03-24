import "../css/style.css";
import "../css/form.css";
import "../css/tasks.css";
import { addTaskGui, todayTasksGui, upcomingTasksGui, completedTasksGui } from "./taskGui";

const contentSpace = document.querySelector(".content")
todayTasksGui()

//display add task form
const addTaskButton = document.querySelector("#add-task")
addTaskButton.addEventListener("click", () => {
    contentSpace.innerHTML = ""
    addTaskGui()
})

//display today's tasks page
const todayButton = document.querySelector("#today")
todayButton.addEventListener("click", () => {
    contentSpace.innerHTML = ""
    todayTasksGui()
})

const upcomingButton = document.querySelector("#upcoming")
upcomingButton.addEventListener("click", () => {
    contentSpace.innerHTML = ""
    upcomingTasksGui()
})

const completedButton = document.querySelector("#completed")
completedButton.addEventListener("click", () => {
    contentSpace.innerHTML = ""
    completedTasksGui()
})
