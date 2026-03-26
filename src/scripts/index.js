import "../css/style.css";
import "../css/form.css";
import "../css/tasks.css";
import { addTaskGui, todayTasksGui, upcomingTasksGui, completedTasksGui } from "./taskGui";

todayTasksGui()

//display add task form
const addTaskButton = document.querySelector("#add-task")
addTaskButton.addEventListener("click", () => {
    addTaskGui()
})

//display today's tasks page
const todayButton = document.querySelector("#today")
todayButton.addEventListener("click", () => {
    todayTasksGui()
})

const upcomingButton = document.querySelector("#upcoming")
upcomingButton.addEventListener("click", () => {
    upcomingTasksGui()
})

const completedButton = document.querySelector("#completed")
completedButton.addEventListener("click", () => {
    completedTasksGui()
})
