import { lightFormat } from "date-fns"

//check if storage type is available, return error if not
export function storageAvailable(type){
    let storage
    try {
        storage = window[type]
        const x = "__storage_test__"
        storage.setItem(x, x)
        storage.removeItem(x)
        return true
    } catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
        )
    }
}

function itemExists(key){
    if (!localStorage.getItem(key)){
        return false
    } else {
        return true
    }
}

export function getItems(key){
    if(!itemExists(key)) return null

    const item = localStorage.getItem(key)

    try {
        return JSON.parse(item)
    } catch {
        throw new Error ("notFound")
    }
}

export function addItem(key, data) {
    try {
        const existing = localStorage.getItem(key)
        const items = existing ? JSON.parse(existing) : []
        items.push(data)

        localStorage.setItem(key, JSON.stringify(items))

    } catch (e) {
        console.error(e)
        throw e
    }
}

export function getTodayItems(key){
    const items = getItems(key)

    if(items){
        const today = new Date()

        const formatNow = lightFormat(today, "dd-MM-yy")

        return items.filter((item) => item._dueDate === formatNow)
    }
}

export function getUpcomingItems(key){
    const items = getItems(key)

    if(items){
        const today = new Date()

        const formatNow = lightFormat(today, "dd-MM-yy")

        return items.filter((item) => item._dueDate > formatNow)
    } 
}

export function getCompletedItems(key){
    const items = getItems(key)

    if(items){
        const today = new Date()

    const formatNow = lightFormat(today, "dd-MM-yy")

    return items.filter((item) => (item._dueDate < formatNow) || (item._checked === true))
    }
}