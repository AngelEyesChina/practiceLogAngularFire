'use strict';
angular.module('practiceLog')
    .constant('baseList', {
        title: "BaseList",
        exercises: [{
            name: "Tai Ji Quan Form",
            category: "Tai Ji Quan"
        }, {
            name: "Five Elements",
            category: "Xing Yi Quan"
        }, {
            name: "Five Elements Form",
            category: "Xing Yi Quan"
        }, {
            name: "Ba Mu Zhang / Eight Mothers Hand",
            category: "Ba Gua Zhang"
        }, {
            name: "Feng Yu Zhang / Wind Cloud Hand",
            category: "Ba Gua Zhang"
        }]
    })
    .controller('BaseListCtrl', ['lodash', 'baseList',
    function(_, baseList) {
        this.exercises = _.groupBy(baseList.exercises, 'category');
    }
]);