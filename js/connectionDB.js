define(
    function () {
        var DBOpenRequest = window.indexedDB.open("database", 1);
        var db;
        DBOpenRequest.onupgradeneeded = function(event) {
            db = DBOpenRequest.result;

            var thisDb = event.target.result;
            if (!thisDb.objectStoreNames.contains('users')) {
                var users = thisDb.createObjectStore('users', { autoIncrement: true });
                users.createIndex("name", "name", { unique: false });
                users.createIndex("email", "email", { unique: true });
                users.createIndex("password", "password", { unique: false });
            }

        };

        DBOpenRequest.onsuccess = function(e) {
            db = DBOpenRequest.result;
        };
    }
);