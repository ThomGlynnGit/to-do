import { isDate, isValid } from "date-fns"

class Task {
    constructor(title, description, dueDate, priority, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checked = false;
        this.id = crypto.randomUUID()
    }

    //getters and setters - validation is completed in setters
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

    get dueDate(){
        return this._dueDate
    }

    set dueDate(date){
        if(!isDate(date)){
            throw new Error("notDate")
        }
        else if(!isValid(date)){
            throw new Error("invalid")
        }
        else{
            this._dueDate = date;
        }
    }
    
    get priority(){
        return this._priority
    }

    set priority(num){
        if(num === NaN || Number.isInteger(num)){
            throw new Error ("NotNum")
        }
        else{
            this._priority = num;
        }
    }

    get notes(){
        return this._notes
    }

    set notes(text){
        if(text.length > 140){
            throw new Error("long")
        }
        else{
            this._notes = text;
        }
    }

    get checked(){
        return this._checked
    }

    set checked(bool){
        if(typeof bool !== "boolean"){
            throw new Error("notBool")
        }
        else{
            this._checked = bool;
        }
    }

    get id(){
        return this._id
    }

    set id(num){
        this._id = num
    }
}

export default Task;
