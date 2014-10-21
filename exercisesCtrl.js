(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('exercisesCtrl', ['$firebase', 'lodash',
        function($firebase, _) {
            var self = this;
            var exercisesRef = new Firebase("https://glowing-inferno-4287.firebaseio.com/exercises");
            var rawExercises = $firebase(exercisesRef).$asArray();
            self.newExercise = {};
            self.addItem = addItem;
            
            
            //init
            //group exercises
            self.exercises = _.groupBy(rawExercises, 'category');
            // each time the server sends records, re-group exercises
            rawExercises.$watch(function(event) {
                self.exercises = _.groupBy(rawExercises, 'category');
            });
            
            
            function addItem() {                
                debugger;
                rawExercises.$add({
                    name: self.newExercise.name,
                    category: self.newExercise.category || null
                });
            }
            //  Alice - example user
        }
    ]);
})();