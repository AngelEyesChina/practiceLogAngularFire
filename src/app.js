(function() {
    'use strict';
    var app = angular.module('practiceLog', ['firebase', 'ngRoute', 'ngLodash', 'mk.editablespan', 'ui.bootstrap.collapse']);

    app.run(["$rootScope", "$location", function($rootScope, $location) {
        $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $location.path("/");
            }
        });
    }]);


    var resolveRequireAuth = {
        // controller will not be loaded until $requireAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
        }]
    };

    //route start
    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'pages/home.html',
            //controller: 'HomeCtrl'
        }).when('/exercises', {
            templateUrl: 'pages/exercises.html',
            resolve: resolveRequireAuth
                //controller: 'aboutController'
        }).when('/lists', {
            templateUrl: 'pages/lists.html',
            resolve: resolveRequireAuth
        }).when('/logLists', {
            templateUrl: 'src/logLists/logLists.html',
            resolve: resolveRequireAuth
        }).when('/list/:listID/exercises', {
            templateUrl: 'pages/exercises.html',
            resolve: resolveRequireAuth
        }).when('/log/:listID/exercises', {
            templateUrl: 'src/yourLog/log.html',
            resolve: resolveRequireAuth
        });
    });
    //route end
    app.constant("moment", moment);
    
    app.filter('fromNow', function(moment) {
                return function(date) {
                    return moment(date).fromNow();
                };
});
})();
