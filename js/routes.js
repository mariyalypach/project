define(['lib/route', 'signUp', 'home', 'account', 'gallery'], function(router, SignUp, home, account, Gallery) {
    route.base('/');

    route('/', function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("page").innerHTML =
                    this.responseText;

                new home.Slider({delay:3000});
                new home.SidebarMenu({searchString:'link-collapsed', paddingX:2, searchStringL2:'sidebar-submenu-collapsed'});
                new home.Content();
            }
        };
        xhttp.open("GET", "view/home.html", true);
        xhttp.send();
        var test = document.querySelectorAll('[title="test"]')[0];
        test.href = "css/home.css";
    });
    route('/create-account', function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("page").innerHTML =
                    this.responseText;

                new SignUp();
            }
        };
        xhttp.open("GET", "view/registration.html", true);
        xhttp.send();
        var test = document.querySelectorAll('[title="test"]')[0];
        test.href = "css/sign-up.css";
    });
    if (localStorage.getItem('user') !== null) {
        route('/user', function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    document.getElementById("page").innerHTML =
                        this.responseText;

                    new account.Tab({searchString:'tab-text'});
                    // console.log(document.querySelector(''));
                    new account.User();
                    new account.Text();
                    new account.Audio();
                    new account.Video();
                }
            };
            xhttp.open("GET", "view/account.html", true);
            xhttp.send();
            var test = document.querySelectorAll('[title="test"]')[0];
            test.href = "css/account.css";
        });
    }
    route('/about-us', function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("page").innerHTML =
                    this.responseText;
                new Gallery();
            }
        };
        xhttp.open("GET", "view/about-us.html", true);
        xhttp.send();
        var test = document.querySelectorAll('[title="test"]')[0];
        test.href = "css/about-us.css";
    });
    route('/contact', function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("page").innerHTML =
                    this.responseText;
                // new Gallery();
            }
        };
        xhttp.open("GET", "view/contact.html", true);
        xhttp.send();
        var newTest = document.querySelectorAll('[title="newTest"]')[0];
        newTest.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB-sP5GaXPOGwR_-QWfmHkeX7VXTXJT-KQ&callback=initMap';
        var test = document.querySelectorAll('[title="test"]')[0];
        test.href = "css/contact.css";
    });


    route.start(true);
});