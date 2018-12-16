function Tab(opts) {
    this.opts = opts;
    this.tabs = document.querySelector('.tabs');
    this.tabList = document.querySelectorAll('.tab-text');
    this.tabContent = document.querySelectorAll('.tab-area');
    this.init();
}

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

var tab = new Tab({searchString:'tab-text'});