export async function openDB() {
    return new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open('imagesDB', 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains('images')) {
                db.createObjectStore('images', { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };

        request.onerror = (event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
}

export async function getImageFromDB(id: string): Promise<string | undefined> {
    const db = await openDB();
    const transaction = db.transaction('images', 'readonly');
    const store = transaction.objectStore('images');
    const request = store.get(id);

    return new Promise<string | undefined>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result?.imageBase64);
        request.onerror = () => reject(request.error);
    });
}


export async function saveImageURLToDB(id: string, url: string) {
    const db = await openDB();
    const transaction = db.transaction('images', 'readwrite');
    const store = transaction.objectStore('images');
    store.put({ id, imageURL: url });

    return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}


export async function getAllImageIDs(): Promise<string[]> {
    const db = await openDB();
    const transaction = db.transaction('images', 'readonly');
    const store = transaction.objectStore('images');
    const request = store.getAllKeys();

    return new Promise<string[]>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result as string[]);
        request.onerror = () => reject(request.error);
    });
}


export async function saveImageToDB(id: string, imageBase64: string) {
    const db = await openDB();
    const transaction = db.transaction('images', 'readwrite');
    const store = transaction.objectStore('images');
    store.put({ id, imageBase64 });

    return new Promise<void>((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
    });
}