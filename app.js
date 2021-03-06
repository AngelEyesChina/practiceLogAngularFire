﻿var app = angular.module("practiceLog", ["firebase"]);

// let's create a re-usable factory that generates the $firebaseSimpleLogin instance
app.factory("simpleLogin", ["$firebaseSimpleLogin", function($firebaseSimpleLogin) {
    var ref = new Firebase("https://glowing-inferno-4287.firebaseio.com/data");
    return $firebaseSimpleLogin(ref);
}]);

// and use it in our controller
app.controller("AuthCtrl", [
    "$scope", "simpleLogin", function($scope, simpleLogin) {
        $scope.auth = simpleLogin;
    }
]);
