define(
    ['lib/route'],
    function () {
        route.base('/');

        route('/', function () {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    document.getElementById("page").innerHTML =
                        this.responseText;
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
                }
            };
            xhttp.open("GET", "view/registration.html", true);
            xhttp.send();
            var test = document.querySelectorAll('[title="test"]')[0];
            test.href = "css/sign-up.css";
        });
        route('/user', function() {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    document.getElementById("page").innerHTML =
                        this.responseText;
                }
            };
            xhttp.open("GET", "view/account.html", true);
            xhttp.send();
            var test = document.querySelectorAll('[title="test"]')[0];
            test.href = "css/account.css";
        });


        route.start(true);
    }
);