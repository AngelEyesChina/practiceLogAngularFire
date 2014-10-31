(function() {
    'use strict';
    var app = angular.module('practiceLog', ['firebase', 'ngRoute', 'ngLodash', 'mk.editablespan', 'ui.bootstrap.collapse']);
    //route start
    app.config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'pages/home.html',
            //controller: 'HomeCtrl'
        }).when('/exercises', {
            templateUrl: 'pages/exercises.html',
            //controller: 'aboutController'
        }).when('/lists', {
            templateUrl: 'pages/lists.html'
        }).when('/list/:listID/exercises', {
            templateUrl: 'pages/exercises.html'
        });
    });
    //route end
    app.service('dataUrlService', ['$firebase','lodash',
        function($firebase, _) {
            var fireBaseUrl = 'https://glowing-inferno-4287.firebaseio.com/';
            this.consts = {
                'exercises': 'exercises',
                'users': 'users',
                'lists': 'lists'
            };
            this.sync = sync;

            function sync(arrayOfArguments) {
                var ref = new Firebase(fireBaseUrl);
                _.forEach(arrayOfArguments, function(arg){
                    ref = ref.child(arg);
                });
                var syncRes = $firebase(ref);
                return syncRes;
            }
        }
    ]);
})();
