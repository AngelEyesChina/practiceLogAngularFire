(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('ExercisesCtrl', ['$firebase', 'lodash',
        function($firebase, _) {
            var self = this;
            var exercisesRef = new Firebase("https://glowing-inferno-4287.firebaseio.com/exercises");
            var rawExercises = $firebase(exercisesRef).$asArray();
            self.newExercise = {};
            self.addItem = addItem;
            self.updateItem = updateItem;
            
            //init
            //group exercises
            prepareExercisesList();
            // each time the server sends records, re-group exercises
            rawExercises.$watch(function(event) {
                prepareExercisesList();
            });

            function prepareExercisesList() {             
                self.exercises = _.groupBy(rawExercises, 'category');
            }

            function addItem() {
                rawExercises.$add({
                    name: self.newExercise.name,
                    category: self.newExercise.category || null
                });
            }

            function updateItem(item) {
                debugger; //1
                var ref = item.$ref();
                rawExercises.$save(item);
            }
            //  Alice - example user
        }
    ]);
})();