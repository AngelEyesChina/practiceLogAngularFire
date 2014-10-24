(function() {
    'user strict';
    var list = angular.module('practiceLog');
    list.directive('exerciseList', function() {
        return {
            restrict: 'E',
            templateUrl: "yourExercises/templates/exercise-list.html",
            scope: {
                title: "@",
                grouped: "="
            }
        }
    });
    list.directive('exerciseTemplate', function() {
        return {
            restrict: 'E',
            templateUrl: "yourExercises/templates/exercise-template.html",
            scope: {
                item: "=",
            },
            controller: 'ExercisesCtrl',
            controllerAs: 'exercisesCtrl'
//             link: function(scope, element, attrs, exercisesCtrl) {
//             }
        }
    });
}());