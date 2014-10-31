(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('ListsCtrl', ['$firebase', '$routeParams', 'dataUrlService', 'lodash',
        function($firebase, $routeParams, dataUrlService, _) {
            var self = this;

            //TODO change to real user id
            getUserLists('user1').then(function(lists) {
                self.lists = lists;
            });

            function getUserLists(userID, callback) {
                var sync = dataUrlService.sync([dataUrlService.consts.users, userID, dataUrlService.consts.lists]);
                var listIDs = sync.$asArray();
                var promise = listIDs.$loaded()
                    .then(function() {
                            var result = _.map(listIDs, function(listID) {
                                var sync = dataUrlService.sync([dataUrlService.consts.lists, listID.$id]);
                                var obj = sync.$asObject();
                                return obj;
                            });
                            return result;
                        },
                        function(err) {
                            console.log(err);
                        });
                return promise;
            }
        }
    ]);
})();