define('jsonParse', ['DBOpenRequest'], function (DBOpenRequest) {
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        };
        rawFile.send(null);
    }

    readTextFile("../categories.json", function(text){
        var data = JSON.parse(text);
        // createCategory(data);
        showCategories();
    });

    /*function createCategory(category) {
        DBOpenRequest.then(function(db) {
            var transaction = db.transaction(["categories"], "readwrite");
            var store = transaction.objectStore("categories");
            for (var obj in category) {
                store.add(category[obj]);
            }
            store.onerror = function(e) {
                alert('error: ' + e.target.error.name);
            };

            store.onsuccess = function(e) {
                alert('success');
            }
        });
    }*/

    function showCategories() {
        DBOpenRequest.then(function(db) {
            var transaction = db.transaction(["categories"], "readwrite");
            var store = transaction.objectStore("categories");
            var request = store.openCursor();
            request.onerror = function(e) {
                alert('error: ' + e.target.error.name);
            };

            /*request.onsuccess = function(ev) {
                var res = ev.target.result;
                if (res) {
                    var objCategories = res.value;
                    var sidebar = document.querySelector('.sidebar');
                    var newDiv = document.createElement('div');
                    newDiv.className = 'sidebar-item link-collapsed';
                    sidebar.appendChild(newDiv);
                    var newA = document.createElement('a');
                    newA.className = 'link category';
                    newA.innerHTML = objCategories.name;
                    newDiv.appendChild(newA);
                    var newUl = document.createElement('ul');
                    newUl.className = 'sidebar-submenu';
                    newDiv.appendChild(newUl);
                    for (var subCategories in objCategories.childCategories) {
                        var newLi = document.createElement('li');
                        newLi.className = 'sidebar-submenu-item sidebar-submenu-collapsed';
                        var newSubA = document.createElement('a');
                        newSubA.className = 'link';
                        newSubA.innerHTML = objCategories.childCategories[subCategories].name;
                        newLi.appendChild(newSubA);
                        newUl.appendChild(newLi);
                        var newSubUl = document.createElement('ul');
                        newSubUl.className = 'sidebar-submenu-l2';
                        newLi.appendChild(newSubUl);
                        for (var subCategoriesL2 in objCategories.childCategories[subCategories].childCategories) {
                            var newSubLi = document.createElement('li');
                            newSubLi.className = 'sidebar-submenu-item-l2';
                            var newSubALev2 = document.createElement('a');
                            newSubALev2.className = 'link';
                            newSubALev2.innerHTML = objCategories.childCategories[subCategories].childCategories[subCategoriesL2].name;
                            newSubLi.appendChild(newSubALev2);
                            newSubUl.appendChild(newSubLi);
                        }
                    }
                    res.continue();
                }
            }*/
        });
    }
});