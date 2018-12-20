// define('addContent', [], function () {
//     function User(opts) {
//         this.opts = opts;
//         this.user = document.querySelector('.user-name');
//         this.init();
//         // localStorage.getItem('user')
//     }
//
//     function Text(opts) {
//         this.opts = opts;
//         this.form = document.querySelector('.text-form');
//         this.input = document.querySelectorAll('.text-input');
//         this.textarea = document.querySelectorAll('.text-textarea');
//         this.res = {};
//         this.init();
//     }
//
//     User.prototype.init = function () {
//         console.log(localStorage.getItem('user'));
//         /*var self = this;
//         window.addEventListener('load', function () {
//             self.getUser();
//         });*/
//     };
//
//     /*User.prototype.getUser = function () {
//         console.log(localStorage.getItem('user'));
//         // this.user.innerHTML = localStorage.getItem('user');
//     };*/
//
//     Text.prototype.init = function () {
//         var self = this;
//         this.form.addEventListener('submit', function(evt) {
//             self.createText(evt);
//         }, false);
//     };
//
//     Text.prototype.createText = function (evt) {
//         evt.preventDefault();
//         for (var i = 0; i < evt.target.length; i++) {
//             if (this.input[i]) {
//                 this.res[this.input[i].getAttribute('name')] = this.input[i].value;
//                 // this.res[this.textarea[i].getAttribute('name')] = this.textarea[i].value;
//             }
//         }
//
//         console.log(this.res);
//         // addText(this.res);
//         evt.target.reset();
//     };
//
//     var text = new Text();
//     var user = new User();
//
//     /*
//     function addText(user) {
//         var transaction = db.transaction(["users"], "readwrite");
//         var store = transaction.objectStore("users");
//         var request = store.add({ name: user.name, email: user.email, password: user.password });
//         request.onerror = function(e) {
//             alert('error: ' + e.target.error.name);
//         };
//
//         request.onsuccess = function(e) {
//             alert('success');
//         }
//     }*/
// });
