export const DB_NAME = 'tracks'
export const CONTENTS_NAME = 'contents'
export const TRACKS_NAME = 'tracks'

var db;

export const ConfigureIndexedDBs = () => {
    let openRequest = indexedDB.open(DB_NAME, 1)

    openRequest.onupgradeneeded = async function () { // срабатывает, если на клиенте нет базы данных
        db = openRequest.result

        if (!db.objectStoreNames.contains(CONTENTS_NAME)) { // если хранилище CONTENTS_NAME не существует
            db.createObjectStore(CONTENTS_NAME, { keyPath: 'id' }) // создаём хранилище
        }

        if (!db.objectStoreNames.contains(TRACKS_NAME)) { // если хранилище TRACKS_NAME не существует
            db.createObjectStore(TRACKS_NAME, { keyPath: 'id' }) // создаём хранилище
        }
    }

    openRequest.onerror = function () {
        console.error("Error", openRequest.error)
    }

    openRequest.onsuccess = function () {
        db = openRequest.result
        // продолжить работу с базой данных, используя объект db
    }
}

export const GetContents = () => {
    return db.transaction(CONTENTS_NAME, "readwrite").objectStore(CONTENTS_NAME)
}

export const GetTracks = () => {
    return db.transaction(TRACKS_NAME, "readwrite").objectStore(CONTENTS_NAME)
}