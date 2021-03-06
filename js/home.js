define('home', ['DBOpenRequest'],
    function (DBOpenRequest) {
        function Slider(opts) {
            this.opts = opts;
            this.slides = document.querySelectorAll('#slides .slide');
            this._currentSlide = 0;
            this.init();
        }

        function Sidebar(opts) {
            this.opts = opts;
            this.sidebar = document.querySelector('.sidebar');
            this.sidebarSubMenu = document.querySelector('.sidebar-submenu');
            this.sideBarIcon = document.querySelector('.sidebar-icon');
            this.closeSideBar = document.querySelector('.sidebar-close');
            this._paddingX = this.opts.paddingX;
            this.init();
        }

        function Content(opts) {
            this.opts = opts;
            this.init();
        }

        Slider.prototype.init = function() {
            setInterval(this.nextSlide.bind(this), this.opts.delay || 2000);
            this.addFluid();
        };

        Slider.prototype.goToSlide = function(n) {
            this.slides[this._currentSlide].className = 'slide';
            this._currentSlide = (n + this.slides.length) % this.slides.length;
            this.slides[this._currentSlide].className = 'slide showing';
        };

        Slider.prototype.nextSlide = function () {
            this.goToSlide(this._currentSlide + 1);
        };

        Slider.prototype.addFluid = function () {
            var container = document.querySelectorAll('.main .container')[0];
            window.onresize = function () {
                if (window.innerWidth < 992) {
                    container.className = "container-fluid";
                }
                else {
                    container.className = "container";
                }
            };
        };

        Sidebar.prototype.init = function () {
            var self = this;
            this.sidebar.addEventListener('click', function (evt) {
                self.showAsideSubmenu(evt);
            }, false);
            this.sidebarSubMenu.addEventListener('click', function (evt) {
                self.showAsideSubmenuL2(evt);
            }, false);
            this.sideBarIcon.addEventListener('click', function (evt) {
                self.showSidebar(evt);
            }, false);
            this.closeSideBar.addEventListener('click', function (evt) {
                self.closeSidebar(evt);
            }, false);
        };

        Sidebar.prototype.showAsideSubmenu = function (evt) {
            var num = evt.target.className.indexOf(this.opts.searchString);
            var item = evt.target.children[1];
            if (num !== -1) {
                evt.target.classList.toggle('link-expanded');
                item.classList.toggle('active');
                item.style.paddingTop = this._paddingX + 'px';
            }
        };

        Sidebar.prototype.showAsideSubmenuL2 = function (evt) {
            var num = evt.target.className.indexOf(this.opts.searchStringL2);
            var item = evt.target.children[1];
            if (num !== -1) {
                evt.target.classList.toggle('sidebar-submenu-expanded');
                item.classList.toggle('active');
                item.style.paddingTop = this._paddingX+this._paddingX + 'px';
            }
        };

        Sidebar.prototype.showSidebar = function () {
            this.sidebar.classList.toggle('active');
        };

        Sidebar.prototype.closeSidebar = function () {
            this.sidebar.classList.toggle('active');
        };

        Content.prototype.init = function () {
            DBOpenRequest.then(function(db) {
                var transaction = db.transaction(["text"], "readwrite");
                var store = transaction.objectStore("text");
                var request = store.openCursor();
                request.onerror = function(e) {
                    alert('error: ' + e.target.error.name);
                };
                request.onsuccess = function (ev) {
                    var res = ev.target.result;
                    if (res) {
                        var textObj = res.value;
                        var mainDiv = document.querySelector('.text-generation');
                        var newDiv = document.createElement('div');
                        newDiv.className = 'col-md-4';
                        mainDiv.appendChild(newDiv);
                        var fileBlock = document.createElement('div');
                        fileBlock.className = 'file-block';
                        newDiv.appendChild(fileBlock);
                        var fileImage = document.createElement('div');
                        fileImage.className = 'file-image';
                        fileBlock.appendChild(fileImage);
                        var img = document.createElement('img');
                        img.src = '../img/text-file.png';
                        fileImage.appendChild(img);
                        var fileTitle = document.createElement('div');
                        fileTitle.className = 'file-title';
                        fileBlock.appendChild(fileTitle);
                        var h4 = document.createElement('h4');
                        h4.innerHTML = textObj.title;
                        fileTitle.appendChild(h4);
                        res.continue();
                    }
                }
            });
        };

        return {
            Slider: Slider,
            SidebarMenu: Sidebar,
            Content: Content
        }
    }
);