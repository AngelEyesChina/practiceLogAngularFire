(function() {
    'use strict';
    var app = angular.module('practiceLog');
    app.factory("User", function($firebase, $FirebaseArray) {
        function User(snap) {
            this.$id = snap.name();
            this.user = snap.val();
        }
        User.prototype = {
            update: function(snap) {
                this.user = snap.val();
            },
            toJSON: function() {
                return this.user;
            }
        };

        return User;
    })

    .factory("UserFactory", function($FirebaseArray, User) {
        return $FirebaseArray.$extendFactory({
            // override the $createObject behavior to return a User object
            $createObject: function(snap) {
                return new User(snap);
            },

            // override the $$updated behavior to call a method on the User
            $$updated: function(snap) {
                var i = this.$indexFor(snap.name());
                var user = this._list[i];
                user.update(snap);
            }
        });
    })

    .factory("Users", function($firebase, dataUrlService, UserFactory) {
        var ref = dataUrlService.getRef([dataUrlService.consts.users]);

        return {
            getAll: function() {
                return $firebase(ref, {
                    arrayFactory: UserFactory
                }).$asArray();
            },
            getByID: function(id) {
                var id_ref = ref.child(id);
                return $firebase(id_ref, {
                    arrayFactory: UserFactory
                }).$asObject();
            }
        };
    });
})();
