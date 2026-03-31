export default class Project {
    constructor(title, description, taskList) {
        this.title = title
        this.description = description
        this.taskList = taskList
        this.id = crypto.randomUUID()
    }

    get title(){
        return this._title;
    }

    set title(name){
        if(name.length < 0){
            throw new Error("blank")
        }
        else if(name.length > 50){
            throw new Error("long")
        }
        else{
            this._title = name;
        }
    }

    get description(){
        return this._description
    }

    set description(info){
        if(info.length > 50){
            throw new Error("long")
        }
        else{
            this._description = info;
        }
    }

    get taskList() {
        return this._taskList
    }

    set taskList(tasks) {
        if(tasks.length === 0) {
            throw new Error("empty")
        } else {
            this._taskList = tasks
        }
    }

    get id() {
        return this._id
    }

    set id(num){
        this._id = num
    }
}