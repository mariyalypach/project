define(function() {
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

    var modal = new Modal();
    var menu = new Menu({ searchString: 'item-collapsed' });
});