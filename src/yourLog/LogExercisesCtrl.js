(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.controller('LogExercisesCtrl', ['$firebase', 'lodash', 'dataUrl', '$routeParams', 'exercises-2015-01-14', '$q','Auth',
        function($firebase, _, dataUrl, $routeParams, exercises, $q, Auth) {
            
            var self = this;
            self.mark = mark;
            var listID = $routeParams.listID;
            var userID = Auth.$getAuth().uid;
            
            ////////////////////////
            var ref = Firebase.util.join(
                dataUrl.getRef([dataUrl.consts.users, userID]), ///users/google:104531750561360041649"),
                dataUrl.getRef([dataUrl.consts.lists, userID]), ///lists/google:104531750561360041649"),
                dataUrl.getRef([dataUrl.consts.exercisesLog, userID]) ///lists/google:104531750561360041649"),
            );
            
            var obj = $firebase(ref).$asObject();
            obj.$loaded().then(function() {
                console.log(obj);
            });
            
            
            
            var sync = dataUrl.sync([dataUrl.consts.lists, listID]);
            self.list = sync.$asObject();
            self.doneExercises = exercises.syncThisWeek(listID);
            self.list.$loaded(syncExercises); //also works with $watch instead of $loaded
            //self.doneExercises.$watch(syncExercises);
            //syncExercises();



            ////////////////////////

            function getListExercises() {
                var result = _.map(self.list.exercises, function(val, exerciseID) {
                    var sync = dataUrl.sync([dataUrl.consts.exercises, exerciseID]);
                    var obj = sync.$asObject();
                    return obj;
                });
                return result;
            }

            function mark(exercise) {
                exercises.markAsDone(exercise, listID);
            }

            function syncExercises() {
                self.exercises = getListExercises();
                self.doneExercises.$loaded().then(syncHelper);
            }

            function syncHelper() {
                var allPromises = _.map(self.exercises, function(val) {
                    return val.$loaded();
                });
                $q.all(allPromises).then(function() {
                    //all exercises and doneExercises are loaded at this point
                    _.forEach(self.doneExercises, function(de) {
                        var e = _.find(self.exercises, {
                            '$id': de.id
                        });
                        e.recent = e.recent || [];
                        e.recent.push(de.time);
                    });
                });
                
            }
        }
    ]);
})();