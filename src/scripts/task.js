class Task {
    constructor(title, description, dueDate, priority, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checked = false;
    }

    get title(){
        return this._title;
    }

    set title(name){
        if(name.length < 0){
            return "blank"
        }
        else if(name.length > 50){
            return "long"
        }
        else{
            this._title = name;
        }
    }
}