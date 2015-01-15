(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('LogListsCtrl', ['$firebase', '$routeParams', 'Users', 'Lists', 'Auth', '$location', function($firebase, $routeParams, Users, Lists, Auth, $location) {
        var self = this;
        getUserLists(Auth.$getAuth().uid);

        function getUserLists(userID, callback) {
            var user = Users.getByID(userID);
            user.$loaded()
                .then(function() {
                    self.lists = Lists.getByUser(user);
                    if (self.lists.length === 1) {
                        var listPath = '/log/' + self.lists[0].$id + '/exercises';
                        $location.path(listPath);
                    }
                });
        }
    }]);
})();