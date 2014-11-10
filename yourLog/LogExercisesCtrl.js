(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('LogExercisesCtrl', ['$firebase', 'lodash', 'dataUrlService', '$routeParams',
        function($firebase, _, dataUrlService, $routeParams) {
            var self = this;

            self.newExercise = {};
            self.addItem = addItem;
            self.updateItem = updateItem;
            self.isCollapsed = true;
            self.resetUserToAlice = resetUserToAlice;


            if ($routeParams.listID !== 'undefined' && $routeParams.listID !== '') {
                var sync = dataUrlService.sync([dataUrlService.consts.lists, $routeParams.listID]);
                self.list = sync.$asObject();
                self.list.$watch(function() {
                    self.exercises = getListExercises();
                });
            }

            function getListExercises() {
                var result = _.map(self.list.exercises, function(val, exerciseID) {
                    var sync = dataUrlService.sync([dataUrlService.consts.exercises, exerciseID]);
                    var obj = sync.$asObject();
                    return obj;
                });
                return result;
            }

            function addItem() {
                var sync = dataUrlService.sync([dataUrlService.consts.exercises]);
                sync.$push({
                    name: self.newExercise.name,
                    category: self.newExercise.category || null
                }).then(function(ref) {
                    var name = ref.name(); // Key for the new ly created record

                    self.list.exercises[name] = true;
                    self.list.$save()
                        .then(function(data) {
                        });
                }, function(err) {
                    console.log(err);
                });
            }

            function updateItem(item) {
                item.$save();
            }

            //for dev:
            function resetUserToAlice() {
                var sync = dataUrlService.sync([dataUrlService.consts.lists, $routeParams.listID]);
                sync.$set("exercises", {
                    "exercise1": "exercise1"
                });

                var syncRoot = dataUrlService.sync([]);
                syncRoot.$set(dataUrlService.consts.exercises, {
                    "exercise1": {
                        "category": "Tai Ji Quan",
                        "name": "Tai Ji Quan Form"
                    },
                    "exercise2": {
                        "category": "Xing Yi Quan",
                        "name": "Five Elements"
                    }
                });
            }
        }
    ]);
})();