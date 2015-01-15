(function() {
    'use strict';
    var app = angular.module('practiceLog');
    // let's create a re-usable factory that generates the $firebaseAuth instance
    app.factory("Auth", ["$firebaseAuth", "dataUrl", function($firebaseAuth, dataUrl) {
        return $firebaseAuth(dataUrl.getRef());
    }]);
})();
