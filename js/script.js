function modal() {
    var modal = document.getElementById('signUpModal');
    var signIn = document.getElementsByClassName('authentication')[0];
    var close = document.getElementsByClassName('popup-close')[0];

    signIn.onclick = function () {
        modal.style.display = 'flex';
    };

    close.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function slider() {
    var slides = document.querySelectorAll('#slides .slide');
    var currentSlide = 0;
    setInterval(nextSlide,2000);

    function nextSlide(){
        goToSlide(currentSlide+1);
    }

    function goToSlide(n){
        slides[currentSlide].className = 'slide';
        currentSlide = (n+slides.length)%slides.length;
        slides[currentSlide].className = 'slide showing';
    }
}

function addFluid() {
    var main = document.getElementsByClassName('main')[0];
    var container = main.getElementsByClassName('container')[0];
    window.onresize = function () {
        if (window.innerWidth < 992) {
            container.className = "container-fluid";
        }
        else {
            container.className = "container";
        }
    };
}

function menu() {
    var burgerButton = document.getElementsByClassName('burger-button')[0];
    var burgerMenu = document.getElementsByClassName('burger-dropdown')[0];
    burgerButton.onclick = showMenu;

    function showMenu() {
        var exp = burgerButton.getAttribute('aria-expanded');
        if (exp === 'true') {
            burgerMenu.style.display = 'none';
            exp = 'false';
        }
        else {
            burgerMenu.style.display = 'flex';
            exp = 'true';
        }
        burgerButton.setAttribute('aria-expanded', exp);
    }
    var subClick = document.getElementsByClassName('burger-navigation')[0];
    subClick.onclick = showSubMenu;
    function showSubMenu(event) {
        var str = 'item-collapsed';
        var num = event.target.className.indexOf(str);
        var item = event.target.children[1];
        if (num !== -1) {
            event.target.classList.toggle('item-expanded');
            item.classList.toggle('active');
        }
    }

    var padding = 2;
    var sidebar = document.getElementsByClassName('sidebar')[0];
    sidebar.onclick = showAsideSubmenu;
    function showAsideSubmenu(event) {
        var str = 'link-collapsed';
        var num = event.target.className.indexOf(str);
        var item = event.target.getElementsByClassName('sidebar-submenu')[0];
        if (num !== -1) {
            event.target.classList.toggle('link-expanded');
            item.classList.toggle('active');
            item.style.paddingTop = padding + 'px';
        }
    }

    var sidebarSubMenu = document.getElementsByClassName('sidebar-submenu')[0];
    sidebarSubMenu.onclick = showAsideSubmenuL2;
    function showAsideSubmenuL2(event) {
        var str = 'sidebar-submenu-collapsed';
        var num = event.target.className.indexOf(str);
        var item = event.target.getElementsByClassName('sidebar-submenu-l2')[0];
        if (num !== -1) {
            event.target.classList.toggle('sidebar-link-expanded');
            item.classList.toggle('active');
            item.style.paddingTop = padding+padding + 'px';
        }
    }

    var sideBarIcon = document.getElementsByClassName('sidebar-icon')[0];
    var closeSideBar = document.getElementsByClassName('sidebar-close')[0];
    sideBarIcon.onclick = showSidebar;
    function showSidebar () {
        sidebar.classList.toggle('active');
    }

    closeSideBar.onclick = closeSidebar;
    function closeSidebar() {
        sidebar.classList.toggle('active');
    }
}

modal();
slider();
addFluid();
menu();

