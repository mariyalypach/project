function Enter(opts) {
    this.opts = opts;
    this.form = document.querySelector('.sign-in-form');
    this.input = document.querySelectorAll('.sign-in-input');
    this.user = {};
    this.init();
}

Enter.prototype.init = function () {
    var self = this;
    this.form.addEventListener('submit', function (evt) {
        self.checkUser(evt);
    },false);
};

Enter.prototype.checkUser = function (evt) {
    evt.preventDefault();
    for (var i = 0; i < evt.target.length; i++) {
        if (this.input[i]) {
            this.user[this.input[i].getAttribute('name')] = this.input[i].value;
        }
    }
    getPerson(this.user);
    evt.target.reset();
};

var signIn = new Enter();

function getPerson(user) {
    var transaction = db.transaction(["users"], "readwrite");
    var objectStore = transaction.objectStore("users");

    var objectStoreRequest = objectStore.openCursor();

    objectStoreRequest.onsuccess = function (ev) {
        var res = ev.target.result;
        if (res) {
            var obj = res.value;

            if (obj.name === user.name && obj.password === user.password) {
                return console.log('Welcome');
                /* На сколько я понял, здесь должно быть что-то типа такого:
                    route('/user/*(возможно id)', function () {
                        var xhttp = new XMLHttpRequest();
                        xhttp.onreadystatechange = function() {
                            if (this.readyState === 4 && this.status === 200) {
                                document.getElementById("page").innerHTML =
                                    this.responseText;
                            }
                        };
                        xhttp.open("GET", "view/user.html", true);
                        xhttp.send();
                        var test = document.querySelectorAll('[title="test"]')[0];
                        test.href = "css/user.css";
                       });
                 */
            }
            else {
                console.log('Try again');
            }
            res.continue();
        }
    }
}
