(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('ListsCtrl', ['$firebase', '$routeParams', 'Users', 'Lists', 'Auth',
        function($firebase, $routeParams, Users, Lists, Auth) {
            var self = this;
            getUserLists(Auth.$getAuth().uid);

            function getUserLists(userID, callback) {
                var user = Users.getByID(userID);
                user.$loaded()
                    .then(function() {
                        self.lists = Lists.getByUser(user);
                    });
            }
        }
    ]);
})();