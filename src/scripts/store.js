
//check if storage type is available, return error if not
export function storageAvailable(type){
    let storageAvailable
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