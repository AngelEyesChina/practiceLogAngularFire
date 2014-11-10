(function() {
        'use strict';
        var app = angular.module('practiceLog')
            .factory("Exercise", function($firebase, $FirebaseArray) {
                function Exercise(snap) {
                    this.$id = snap.name();
                    this.exercise = snap.val();
                }
                Exercise.prototype = {
                    update: function(snap) {
                        this.exercise = snap.val();
                    },
                    toJSON: function() {
                        return this.exercise;
                    }
                };

                return Exercise;
            })

        .factory("ExerciseFactory", function($FirebaseArray, Exercise) {
            return $FirebaseArray.$extendFactory({
                // override the $createObject behavior to return a Exercise object
                $createObject: function(snap) {
                    return new Exercise(snap);
                },

                // override the $$updated behavior to call a method on the Exercise
                $$updated: function(snap) {
                    var i = this.$indexFor(snap.name());
                    var exercise = this._list[i];
                    exercise.update(snap);
                }
            });
        })

        .factory("Exercises", function($firebase, dataUrlService, ExerciseFactory, Lists) {
                var ref = new Firebase(dataUrlService.getRef([dataUrlService.consts.exercises]));
            return {
                getAll: function() {
                    return $firebase(ref, {
                        arrayFactory: ExerciseFactory
                    }).$asArray();
                },
                getById: function(id) {
                    return $firebase(ref.child(id), {
                        arrayFactory: ExerciseFactory
                    }).$asArray();
                },
                getByList: function(list) {
                    //TODO: continue here    
                }
            };
        });
})();
