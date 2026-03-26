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
    console.log(JSON.parse(item))
    try {
        return JSON.parse(item)
    } catch {
        throw new Error ("notFound")
    }
}

export function getItem(key, id){
    if(!itemExists(key)) return null

    const items = localStorage.getItem(key)

    try {
        const parsed = JSON.parse(items)

        for(const item of parsed){
            if(item._id === id){
                return item
            } 
        }
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

export function updateValue(key, id, property, value) {
    const items = getItems(key)

    for(const item of items) {
        if(id === item._id){
            item[property] = value
        }
    }

    localStorage.setItem(key, JSON.stringify(items))
}

export function deleteItem(key, id){
    if(!itemExists(key)) return null

    const items = localStorage.getItem(key)

    try {
        const parsed = JSON.parse(items)

        const itemRemovedList = parsed.filter(item => item._id !== id)

        localStorage.clear()
        localStorage.setItem(key, JSON.stringify(itemRemovedList))
    } catch {
        throw new Error ("notFound")
    }
}

export function getTodayItems(key){
    const items = getItems(key)
    
    if(items){
        const today = new Date().toISOString().split("T")[0]

        return items.filter((item) => item._dueDate === today 
            && item._checked === false)
    }
}

export function getUpcomingItems(key){
    const items = getItems(key)

    if(items){
        const today = new Date().toISOString().split("T")[0]

        return items.filter((item) => (new Date(item._dueDate) > new Date(today)) 
            && item._checked === false)
    } 
}

export function getCompletedItems(key){
    const items = getItems(key)
    
    if(items){
        const today = new Date().toISOString().split("T")[0]

        return items.filter((item) => (new Date(item._dueDate) < new Date(today)) 
            || item._checked == true)
    }
}