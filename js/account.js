define('account', ['DBOpenRequest'], function (DBOpenRequest) {
    function User(opts) {
        this.opts = opts;
        this.user = document.querySelector('.user-name');
        this.init();
    }

    function Text(opts) {
        this.opts = opts;
        this.form = document.querySelector('.text-form');
        this.input = document.querySelectorAll('.text-input');
        this.res = {};
        this.init();
    }

    function Audio(opts) {
        this.opts = opts;
        this.form = document.querySelector('.audio-form');
        this.input = document.querySelectorAll('.audio-input');
        this.res = {};
        this.init();
    }

    function Video(opts) {
        this.opts = opts;
        this.form = document.querySelector('.video-form');
        this.input = document.querySelectorAll('.video-input');
        this.res = {};
        this.init();
    }

    function Tab(opts) {
        this.opts = opts;
        this.tabs = document.querySelector('.tabs');
        this.tabList = document.querySelectorAll('.tab-text');
        this.tabContent = document.querySelectorAll('.tab-area');
        this.init();
    }

    User.prototype.init = function () {
        // console.log(typeof localStorage.getItem('user'));
        var user = JSON.parse(localStorage.getItem('user'));
        this.user.innerHTML = user.name;
        /*var self = this;
        window.addEventListener('load', function () {
            self.getUser();
        });*/
    };

    /*User.prototype.getUser = function () {
        console.log(localStorage.getItem('user'));
        // this.user.innerHTML = localStorage.getItem('user');
    };*/

    Text.prototype.init = function () {
        var self = this;
        this.form.addEventListener('submit', function(evt) {
            self.createText(evt);
        }, false);
    };

    Text.prototype.createText = function (evt) {
        evt.preventDefault();
        for (var i = 0; i < this.input.length; i++) {
            this.res[this.input[i].getAttribute('name')] = this.input[i].value;
        }
        // var res = this.res;
        addText(this.res);
        // sendXhr(res, data);
        evt.target.reset();
    };

    Tab.prototype.init = function () {
        var self = this;
        this.tabs.addEventListener('click', function (evt) {
            self.showContent(evt);
        }, false);
    };

    Tab.prototype.showContent = function (evt) {
        evt.preventDefault();
        var num = evt.target.className.indexOf(this.opts.searchString);
        if (num !== -1) {
            for (var i = 0; i < this.tabList.length; i++) {
                this.tabList[i].className = this.tabList[i].className.replace(' active', '');
                this.tabContent[i].className = this.tabContent[i].className.replace(' active', '');
            }
            evt.target.className += ' active';
            document.getElementById(evt.target.getAttribute('data-tab')).className += ' active';
        }
    };

    Audio.prototype.init = function () {
        var self = this;
        this.form.addEventListener('submit', function(evt) {
            self.createAudio(evt);
        }, false);
    };

    Audio.prototype.createAudio = function (evt) {
        evt.preventDefault();
        for (var i = 0; i < this.input.length; i++) {
            this.res[this.input[i].getAttribute('name')] = this.input[i].value;
            if (this.input[i].files) {
                var files = this.input[i].files;
                var data = new FormData();
                for (var key in files) {
                    data.append(key, files[key]);
                }

                data.append( 'my_file_upload', 1 );
                this.res[this.input[i].getAttribute('name')] = data;
            }
        }
        var res = this.res;
        sendXhr(res, data);
        evt.target.reset();
    };

    Video.prototype.init = function () {
        var self = this;
        this.form.addEventListener('submit', function(evt) {
            self.createVideo(evt);
        }, false);
    };

    Video.prototype.createVideo = function (evt) {
        evt.preventDefault();
        for (var i = 0; i < this.input.length; i++) {
            this.res[this.input[i].getAttribute('name')] = this.input[i].value;
            if (this.input[i].files) {
                var files = this.input[i].files;
                var data = new FormData();
                for (var key in files) {
                    data.append(key, files[key]);
                }

                data.append( 'my_file_upload', 1 );
                this.res[this.input[i].getAttribute('name')] = data;
            }
        }
        var res = this.res;
        sendXhr(res, data);
        evt.target.reset();
    };

    function sendXhr(res, data) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'upload.php', true);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var html = '';
                var files_path = JSON.parse(this.responseText).files;
                for (var val in files_path) {
                    html += files_path[val];
                }
                return addText(res, html);
            }
        };
        xhr.send(data);
    }

    function addText(user, html) {
        if (user.textTitle) {
            DBOpenRequest.then(function(db) {
                var transaction = db.transaction(["text"], "readwrite");
                var store = transaction.objectStore("text");
                var request = store.add({ title: user.textTitle, category: user.textCategory, textContent: user.textContent});
                request.onerror = function(e) {
                    alert('error: ' + e.target.error.name);
                };

                request.onsuccess = function(e) {

                    alert('success');
                }
            });
        }
        else if (user.audioTitle) {
            DBOpenRequest.then(function(db) {
                var transaction = db.transaction(["audio"], "readwrite");
                var store = transaction.objectStore("audio");
                var request = store.add({ title: user.audioTitle, category: user.audioCategory, audioContent: html});
                request.onerror = function(e) {
                    alert('error: ' + e.target.error.name);
                };

                request.onsuccess = function(e) {
                    alert('success');
                }
            });
        }
        else if (user.videoTitle) {
            DBOpenRequest.then(function(db) {
                var transaction = db.transaction(["video"], "readwrite");
                var store = transaction.objectStore("video");
                var request = store.add({ title: user.videoTitle, category: user.videoCategory, videoContent: html});
                request.onerror = function(e) {
                    alert('error: ' + e.target.error.name);
                };

                request.onsuccess = function(e) {
                    alert('success');
                }
            });
        }
    }

    // var tab = new Tab({searchString:'tab-text'});
    return {
        User: User,
        Text: Text,
        Audio: Audio,
        Video: Video,
        Tab: Tab
    }
});