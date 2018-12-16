define('main', ['DBOpenRequest'], function(DBOpenRequest) {
    function Modal(opts) {
        this.opts = opts;
        this.modal = document.querySelector('#signUpModal');
        this.signIn = document.querySelector('.authentication');
        this.close = document.querySelector('.popup-close');
        this.signUp = document.querySelector('.sign-up-button');
        this.init();
    }

    function Menu(opts) {
        this.opts = opts;
        this.burgerButton = document.querySelector('.burger-button');
        this.burgerMenu = document.querySelector('.burger-dropdown');
        this.subClick = document.querySelector('.burger-navigation');
        this.init();
    }

    function SignIn(opts) {
        this.opts = opts;
        this.form = document.querySelector('.sign-in-form');
        this.input = document.querySelectorAll('.sign-in-input');
        this.user = {};
        this.init();
    }

    Modal.prototype.init = function() {
        var self = this;
        this.signIn.addEventListener('click', function() {
            self.showModalBlock();
        }, false);
        // Не знаю, как лучше назвать showModalBlock(), так как showModal уже занято
        this.close.addEventListener('click', function() {
            self.closeModal();
        }, false);

        this.signUp.addEventListener('click', function() {
            self.closeModal();
        });

        window.addEventListener('click', function(ev) {
            self.closeOutsideModal(ev);
        })
    };

    Modal.prototype.showModalBlock = function() {
        this.modal.style.display = 'flex';
    };

    Modal.prototype.closeModal = function() {
        this.modal.style.display = 'none';
    };

    Modal.prototype.closeOutsideModal = function(ev) {
        if (ev.target === this.modal) {
            this.modal.style.display = 'none';
        }
    };

    Menu.prototype.init = function() {
        var self = this;
        this.burgerButton.addEventListener('click', function() {
            self.showMenu();
        }, false);
        this.subClick.addEventListener('click', function(evt) {
            self.showSubMenu(evt);
        }, false);
    };

    Menu.prototype.showMenu = function() {
        var exp = this.burgerButton.getAttribute('aria-expanded');
        if (exp === 'true') {
            this.burgerMenu.style.display = 'none';
            exp = 'false';
        } else {
            this.burgerMenu.style.display = 'flex';
            exp = 'true';
        }
        this.burgerButton.setAttribute('aria-expanded', exp);
    };

    Menu.prototype.showSubMenu = function(evt) {
        var num = evt.target.className.indexOf(this.opts.searchString);
        var item = evt.target.children[1];
        if (num !== -1) {
            evt.target.classList.toggle('item-expanded');
            item.classList.toggle('active');
        }
    };

    SignIn.prototype.init = function () {
        var self = this;
        this.form.addEventListener('submit', function (evt) {
            self.checkUser(evt);
        },false);
    };

    SignIn.prototype.checkUser = function (evt) {
        evt.preventDefault();
        for (var i = 0; i < evt.target.length; i++) {
            if (this.input[i]) {
                this.user[this.input[i].getAttribute('name')] = this.input[i].value;
            }
        }
        getPerson(this.user);
        evt.target.reset();
    };

    function getPerson(user) {
        DBOpenRequest.then(function(db) {
            var transaction = db.transaction(["users"], "readwrite");
            var store = transaction.objectStore("users");
            var request = store.openCursor();
            request.onerror = function(e) {
                alert('error: ' + e.target.error.name);
            };
            request.onsuccess = function(ev) {
                var res = ev.target.result;
                if (res) {
                    var obj = res.value;
                    if (obj.name === user.name && obj.password === user.password) {
                        return console.log('Welcome');
                    }
                    else { console.log('Try again'); }
                    res.continue();
                }
            }
        });
    }

    var modal = new Modal();
    var menu = new Menu({ searchString: 'item-collapsed' });
    var signIn = new SignIn();
});