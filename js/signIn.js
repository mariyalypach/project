// define('signIn', ['DBOpenRequest'],
//     function (DBOpenRequest) {
//         function Enter(opts) {
//             this.opts = opts;
//             this.form = document.querySelector('.sign-in-form');
//             this.input = document.querySelectorAll('.sign-in-input');
//             this.user = {};
//             this.init();
//         }
//
//         Enter.prototype.init = function () {
//             var self = this;
//             this.form.addEventListener('submit', function (evt) {
//                 self.checkUser(evt);
//             },false);
//         };
//
//         Enter.prototype.checkUser = function (evt) {
//             evt.preventDefault();
//             for (var i = 0; i < evt.target.length; i++) {
//                 if (this.input[i]) {
//                     this.user[this.input[i].getAttribute('name')] = this.input[i].value;
//                 }
//             }
//             getPerson(this.user);
//             evt.target.reset();
//         };
//
//         function getPerson(user) {
//             DBOpenRequest.then(function(db) {
//                 var transaction = db.transaction(["users"], "readwrite");
//                 var store = transaction.objectStore("users");
//                 var request = store.openCursor();
//                 request.onerror = function(e) {
//                     alert('error: ' + e.target.error.name);
//                 };
//                 request.onsuccess = function(ev) {
//                     var res = ev.target.result;
//                     if (res) {
//                         var obj = res.value;
//                         if (obj.name === user.name && obj.password === user.password) {
//                             return console.log('Welcome');
//                         }
//                         else { console.log('Try again'); }
//                         res.continue();
//                     }
//                 }
//             });
//         }
//         return Enter;
//
//     }
// );
