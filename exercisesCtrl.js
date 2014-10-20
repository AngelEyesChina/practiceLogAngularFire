(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('exercisesCtrl', ['$scope', '$firebase','lodash', 
        function($scope, $firebase,_) {
            var exercisesRef = new Firebase("https://glowing-inferno-4287.firebaseio.com/exercises");
            this.rawExercises = $firebase(exercisesRef).$asArray();
            //this.exercises2 = _.groupBy(this.rawExercises, 'category');
            $scope.exercises = this.rawExercises;
            
            //for debugging
            $scope.exercisesText = this.rawExercises; // + " grouped: " + JSON.stringify(this.exercises2);

            //  Alice
            //Code here
        }
    ]);
})();