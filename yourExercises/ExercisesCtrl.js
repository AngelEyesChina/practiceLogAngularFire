(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('ExercisesCtrl', ['$firebase', 'lodash', 'consts',
        function($firebase, _, consts) {
            var self = this;
            var exercisesRef = new Firebase(consts.fireBaseUrl + consts.exercisesUrl );
            var usersRef = new Firebase(consts.fireBaseUrl + consts.usersUrl );
            self.exercises= $firebase(exercisesRef).$asArray();
            self.newExercise = {};
            self.addItem = addItem;
            self.updateItem = updateItem;
            self.isCollapsed = true;

            function getUserLists(userID){
             //TODO   
                
            }
            
            function getListExercises(listID){
                //TODO   
            }
            
            function addItem() {
                self.exercises.$add({
                    name: self.newExercise.name,
                    category: self.newExercise.category || null
                });
            }

            function updateItem(item) {
                self.exercises.$save(item);
            }
            //  Alice - example user
        }
    ]);
})();