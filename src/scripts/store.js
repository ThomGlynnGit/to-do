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

export function itemExists(key){
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
        return item
    }
}
