'use strict';
var app = angular.module('practiceLog', ['firebase', 'ngRoute', 'ngLodash', 'mk.editablespan']);

//route start
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            //controller: 'HomeCtrl'
        })

    .when('/exercises', {
        templateUrl: 'pages/exercises.html',
        //controller: 'aboutController'
    });
});
//route end