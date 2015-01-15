(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('LogExercisesCtrl', ['$firebase', 'lodash', 'dataUrl', '$routeParams', 'exercises-2015-01-14',

        function($firebase, _, dataUrl, $routeParams, exercises) {
            var self = this;
            self.doneExercises = exercises.getThisWeek();
            self.doneExercises.$loaded().then(function() {
                console.log("self.doneExercises : " + self.doneExercises);
            });
            ////////////////////////
            
            if ($routeParams.listID !== 'undefined' && $routeParams.listID !== '') {
                var sync = dataUrl.sync([dataUrl.consts.lists, $routeParams.listID]);
                self.list = sync.$asObject();
                self.list.$watch(function() {
                    self.exercises = getListExercises();
                });
            }
            
            
            ////////////////////////

            function getListExercises() {
                var result = _.map(self.list.exercises, function(val, exerciseID) {
                    var sync = dataUrl.sync([dataUrl.consts.exercises, exerciseID]);
                    var obj = sync.$asObject();
                    return obj;
                });
                return result;
            }


        }
    ]);
})();