(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('ExercisesCtrl', ['$firebase', 'lodash', 'dataUrlService', '$routeParams',
        function($firebase, _, dataUrlService, $routeParams) {
            var self = this;

            self.newExercise = {};
            self.addItem = addItem;
            self.updateItem = updateItem;
            self.isCollapsed = true;


            if ($routeParams.listID !== 'undefined' && $routeParams.listID !== '') {
                getListExercises($routeParams.listID).then(function(list) {
                    self.exercises = list;
                });
            }

            function getListExercises(listID) {
                var url = dataUrlService.getUrl([dataUrlService.consts.lists, listID, dataUrlService.consts.exercises]);
                var ref = new Firebase(url);
                var list = $firebase(ref).$asArray();
                var promise = list.$loaded()
                    .then(function() {
                            var result = _.map(list, function(exerciseID) {
                                var url = dataUrlService.getUrl([dataUrlService.consts.exercises, exerciseID.$id]);
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

            function addItem() {
                self.exercises.$add({
                    name: self.newExercise.name,
                    category: self.newExercise.category || null
                });
            }

            function updateItem(item) {
                self.exercises.$save(item);
            }
        }
    ]);
})();