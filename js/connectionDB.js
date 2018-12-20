define('DBOpenRequest', [],
    function () {
        return new Promise(function(resolve, reject) {
            var DBOpenRequest = window.indexedDB.open("database", 1);
            DBOpenRequest.onupgradeneeded = function(event) {
                var thisDb = event.target.result;
                if (!thisDb.objectStoreNames.contains('users')) {
                    var users = thisDb.createObjectStore('users', { autoIncrement: true });
                    users.createIndex("name", "name", { unique: false });
                    users.createIndex("email", "email", { unique: true });
                    users.createIndex("password", "password", { unique: false });
                }
                if (!thisDb.objectStoreNames.contains('categories')) {
                    var categories = thisDb.createObjectStore('categories', {autoIncrement: true});
                    categories.createIndex('name', 'name', {unique:false});
                    categories.createIndex('childCategories', 'childCategories', {unique:false, multiEntry:true});
                }
                if (!thisDb.objectStoreNames.contains('text')) {
                    var text = thisDb.createObjectStore('text', {autoIncrement: true});
                    text.createIndex('textTitle', 'textTitle', {unique:false});
                    text.createIndex('textCategory', 'textCategory', {unique:false});
                    text.createIndex('textContent', 'textContent', {unique:false});
                }
                if (!thisDb.objectStoreNames.contains('audio')) {
                    var audio = thisDb.createObjectStore('audio', {autoIncrement: true});
                    audio.createIndex('audioTitle', 'audioTitle', {unique:false});
                    audio.createIndex('audioCategory', 'audioCategory', {unique:false});
                    audio.createIndex('audioContent', 'audioContent', {unique:false});
                }
                if (!thisDb.objectStoreNames.contains('video')) {
                    var video = thisDb.createObjectStore('video', {autoIncrement: true});
                    video.createIndex('videoTitle', 'videoTitle', {unique:false});
                    video.createIndex('videoCategory', 'videoCategory', {unique:false});
                    video.createIndex('videoContent', 'videoContent', {unique:false});
                }

            };
            DBOpenRequest.onsuccess = function(e) {
                resolve(DBOpenRequest.result);
            };
            DBOpenRequest.onerror = function(e) {
                reject(e);
            };
        })
    }
);