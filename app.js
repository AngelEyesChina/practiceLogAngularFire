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
    app.service('dataUrlService', ['$firebase',
        function() {
            var fireBaseUrl = 'https://glowing-inferno-4287.firebaseio.com/';
            this.consts = {
                'exercises': 'exercises',
                'users': 'users',
                'lists': 'lists'
            };
            this.getUrl = getUrl;

            // returns the strings contcated, in order, with exactly one forward slash between each.
            function getUrl(arrayOfArguments) {
                var re = new RegExp("/+");
                return fireBaseUrl + arrayOfArguments.join('/').replace(re, '/');
            }
        }
    ]);
})();
