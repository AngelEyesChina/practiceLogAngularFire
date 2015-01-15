(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.factory('exercises-2015-01-14', function($firebase, dataUrl, moment) {
        var ref = dataUrl.getRef(['exercisesLog', 'list1']);
        var thisWeekStart = moment().startOf('week').valueOf();
        var exercises = {
            getThisWeek: function(exercise) {
                return $firebase(ref.startAt(thisWeekStart)).$asArray();
            },
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
