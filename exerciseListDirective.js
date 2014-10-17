(function() {
    'user strict';
    var list = angular.module('practiceLog');
    list.directive('exerciseList', function() {
        return {
            restrict: 'E',
            templateUrl: "/templates/exercise-list.html"
        };
    });
    list.directive('exerciseTemplate', function() {
        return {
            restrict: 'E',
            templateUrl: "/templates/exercise-template.html",
            scope: {
                item:"="
            }
        };
    });
}())
