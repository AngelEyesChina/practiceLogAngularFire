angular.module('practiceLog').constant('baseList', {
    lists: {
        list1: {
            title: "BaseList",
            userID: "practiceLog",
            exercises: {
                exercise1: true
            }
        }
    },
    exercises: {
        exercise1: {
            name: "Tai Ji Quan Form",
            category: "Tai Ji Quan"
        },
        exercise2: {
            name: "Five Elements",
            category: "Xing Yi Quan"
        },
        exercise3: {
            name: "Five Elements Form",
            category: "Xing Yi Quan"
        },
        exercise4: {
            name: "Ba Mu Zhang / Eight Mothers Hand",
            category: "Ba Gua Zhang"
        },
        exercise5: {
            name: "Feng Yu Zhang / Wind Cloud Hand",
            category: "Ba Gua Zhang"
        }
    }
});