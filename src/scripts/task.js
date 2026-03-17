import { isDate, isFuture, isValid, lightFormat } from "date-fns"

class Task {
    constructor(title, description, dueDate, priority, notes){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checked = false;
    }

    //getters and setters - validation is completed in setters
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

    get description(){
        return this._description
    }

    set description(info){
        if(info.length > 50){
            return "long"
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
            return "notDate"
        }
        else if(!isFuture(date)){
            return "past"
        }
        else if(!isValid(date)){
            return "invalid"
        }
        else{
            this._dueDate = lightFormat(date,"dd-MM-yy");
        }
    }
    
    get priority(){
        return this._priority
    }

    set priority(num){
        if(num === NaN || Number.isInteger(num)){
            return "notNum"
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
            return "long"
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
            return "notBool"
        }
        else{
            this._checked = bool;
        }
    }
}

export default Task;
