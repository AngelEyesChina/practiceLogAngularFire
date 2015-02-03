(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller("AuthCtrl", ["$scope", "Auth", "$route", "$timeout", "$location",
        function($scope, Auth, $route, $timeout, $location) {
            var self = this;
            self.login = login;
            self.logout = logout;

            ///////////

            Auth.$onAuth(function(userData) {
                // $timeout needed for AngularFire 0.9.0
                // see https://github.com/firebase/angularfire/issues/510
                $timeout(function() {
                    self.user = userData;
                    if (angular.isObject(userData)) {
                        console.log("uid: '" + userData.uid + "'");
                    }
                });
                $route.reload();
            });

            ///////////

            function login() {
                Auth.$authWithOAuthRedirect("google").then(function() {
                    $location.path("/logLists");
                });
            }

            function logout() {
                Auth.$unauth();
            }
        }
    ]);
})();
