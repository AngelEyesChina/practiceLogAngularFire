(function() {
    'user strict';
    var list = angular.module('practiceLog');
    
    list.directive('exerciseList', ['lodash', function(_) {
            return {
                restrict: 'E',
                templateUrl: "/templates/exercise-list.html",
                scope: {
                    title: "=",
                    item: "="
                },
                link: function(scope, element, attrs) {
                    scope.groupedItems = _.groupBy(attrs["item"], 'category');
                    console.log(scope.groupedItems);
                }
            };
        }
    ]);
    
    list.directive('exerciseTemplate',
        function() {
            return {
                restrict: 'E',
                templateUrl: "/templates/exercise-template.html",
                scope: {
                    item: "="
                }
            };
        }
    );
}());
