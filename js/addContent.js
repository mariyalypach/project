function Text(opts) {
    this.opts = opts;
    this.form = document.querySelector('.text-form');
    this.input = document.querySelectorAll('.text-input');
    this.textarea = document.querySelectorAll('.text-textarea');
    this.res = {};
    this.init();
}

Text.prototype.init = function () {
    var self = this;
    this.form.addEventListener('submit', function(evt) {
        self.createText(evt);
    }, false);
};

Text.prototype.createText = function (evt) {
    evt.preventDefault();
    for (var i = 0; i < evt.target.length; i++) {
        if (this.input[i]) {
            this.res[this.input[i].getAttribute('name')] = this.input[i].value;
            // this.res[this.textarea[i].getAttribute('name')] = this.textarea[i].value;
        }
    }

    console.log(this.res);
    // addText(this.res);
    evt.target.reset();
};

var text = new Text();

/*
function addText(user) {
    var transaction = db.transaction(["users"], "readwrite");
    var store = transaction.objectStore("users");
    var request = store.add({ name: user.name, email: user.email, password: user.password });
    request.onerror = function(e) {
        alert('error: ' + e.target.error.name);
    };

    request.onsuccess = function(e) {
        alert('success');
    }
}*/
