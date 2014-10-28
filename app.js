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
    });
});
//route end
app.constant('consts', {
    'fireBaseUrl': 'https://glowing-inferno-4287.firebaseio.com/',
    'exercisesUrl': 'exercises',
    'usersUrl'
});