(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('ExercisesCtrl', ['$firebase', 'lodash', 'dataUrl', '$routeParams', 'Lists', 'Exercises',
        function($firebase, _, dataUrl, $routeParams, Lists, Exercises) {
            var self = this;

            self.newExercise = {};
            self.addItem = addItem;
            self.updateItem = updateItem;
            self.isCollapsed = true;
            self.resetUserToHanan = resetUserToHanan;
            if (typeof $routeParams.listID !== 'undefined' && $routeParams.listID !== '') {
                self.list = Lists.getByID($routeParams.listID);
                self.list.$watch(function() {
                    self.exercises = getListExercises();
                });
            }


            function getListExercises() {
                var res = Exercises.getByList(self.list);
                return res;
            }


            function addItem() {
                // if (self.exercises) {
                //     self.exercises.$add(self.newExercise);
                // }
                var sync = dataUrl.sync([dataUrl.consts.exercises]);
                sync.$push({
                    name: self.newExercise.name,
                    category: self.newExercise.category || null
                }).then(function(ref) {
                    var name = ref.name(); // Key for the new ly created record

                    self.list.exercises[name] = true;
                    self.list.$save()
                        .then(function(data) {});
                }, function(err) {
                    console.log(err);
                });
            }

            function updateItem(item) {
                item.$save();
            }

            //for dev:
            function resetUserToHanan() {
                var listID = 'list1';
                if (angular.isObject($routeParams.listID)) {
                    listID = $routeParams.listID;
                }

                var sync = dataUrl.sync([dataUrl.consts.lists, listID]);
                sync.$set("exercises", {
                    "exercise1": "exercise1"
                });

                var syncRoot = dataUrl.sync([]);
                syncRoot.$set(dataUrl.consts.exercises, {
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