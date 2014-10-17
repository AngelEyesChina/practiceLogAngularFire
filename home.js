'use strict';
var app = angular.module("practiceLog");

app.controller("HomeCtrl", ['baseList', function(baseList) {
        this.baseList = baseList;
        // var home = this;
        // home.baseList = {};
        // $http.get('/baseList.js')
        // .success(function (data){
        //     home.baseList = data;
        // });
    }
]);