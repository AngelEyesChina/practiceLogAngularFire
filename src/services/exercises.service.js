(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.factory('exercises-2015-01-14', function($firebase, dataUrl, moment) {
        var thisWeekStart = moment().startOf('week').valueOf();
        // console.log(moment(thisWeekStart).format());
        // console.log("thisWeekStart = " + thisWeekStart);
        var exercises = {
            syncThisWeek: function(listID) {
                var ref = dataUrl.getRef(['exercisesLog', listID]);
                return $firebase(ref.orderByChild("time").startAt(thisWeekStart)).$asArray();
            },
            syncAll: function(listID) {
                var ref = dataUrl.getRef(['exercisesLog', listID]);
                return $firebase(ref.orderByChild("time")).$asArray();
            },
            markAsDone: function(exercise, listID){
                var ref = dataUrl.getRef(['exercisesLog', listID]);
                var exerciseMarked = {
                    id : exercise.$id,
                    time : Firebase.ServerValue.TIMESTAMP
                };
                var res = $firebase(ref).$asArray().$add(exerciseMarked);
                return res;
            }
            /*    all: exercisesArray,
                create: function(exercise) {
                    return exercisesArray.$add(exercise);
                },
                get: function(exerciseID) {
                    return exercisesArray.child(exerciseID)).$asObject();
                },
                delete: function(exercise) {
                    return exercisesArray.$remove(exercise);
                }*/
        };

        return exercises;
    });
})();
