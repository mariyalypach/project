define('gallery', [], function () {

    function Gallery(opts) {
        this.opts = opts;
        this.largeImg = document.querySelector('.large-image');
        this.thumbs = document.getElementById('thumbs');
        this.init();
    }

    Gallery.prototype.init = function () {
        var self = this;
        this.thumbs.addEventListener('click', function (ev) {
            self.changeImage(ev);
        }, false);
    };

    Gallery.prototype.changeImage = function (e) {
        e.preventDefault();
        var target = e.target;
        while (target !== e.currentTarget) {
            if (target.nodeName === 'LI') {
                this.showThumbnail(target.children[0].href, target.children[0].title);
                return false;
            }
            target = target.parentNode;
        }
    };

    Gallery.prototype.showThumbnail = function (href, title) {
        // this.largeImg.style.backgroundImage = "url('" + href + "')";
        this.largeImg.src = href;
        this.thumbs.alt = title;
    };

    return Gallery;
});