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
                var url = dataUrlService.getUrl([dataUrlService.consts.users, userID, dataUrlService.consts.lists]);
                var ref = new Firebase(url);
                var listIDs = $firebase(ref).$asArray();
                var promise = listIDs.$loaded()
                    .then(function() {
                            var result = _.map(listIDs, function(listID) {
                                var url = dataUrlService.getUrl([dataUrlService.consts.lists, listID.$id]);
                                var ref = new Firebase(url);
                                var obj = $firebase(ref).$asObject();
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