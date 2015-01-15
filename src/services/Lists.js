(function() {
    'use strict';
    var app = angular.module('practiceLog')
        .factory("List", function($firebase, $FirebaseArray) {
            function List(snap) {
                this.$id = snap.name();
                this.list = snap.val();
            }
            List.prototype = {
                update: function(snap) {
                    this.list = snap.val();
                },
                toJSON: function() {
                    return this.list;
                }
            };

            return List;
        })

    .factory("ListFactory", function($FirebaseArray, List) {
        return $FirebaseArray.$extendFactory({
            // override the $createObject behavior to return a List object
            $createObject: function(snap) {
                return new List(snap);
            },

            // override the $$updated behavior to call a method on the List
            $$updated: function(snap) {
                var i = this.$indexFor(snap.name());
                var list = this._list[i];
                list.update(snap);
            }
        });
    })

    .factory("Lists", ['$firebase', 'dataUrl', 'ListFactory', 'lodash', 'Users',
        function($firebase, dataUrl, ListFactory, _, Users) {
            var ref = dataUrl.getRef([dataUrl.consts.lists]);

            return {
                getAll: getAll,
                getByID: getByID,
                getByUser: getByUser
            };

            function getAll() {
                return $firebase(ref, {
                    arrayFactory: ListFactory
                }).$asArray();
            }

            function getByID(id) {
                return $firebase(ref.child(id), {
                    arrayFactory: ListFactory
                }).$asObject();
            }

            function getByUser(user) {
                return _.map(user.lists, function(val, listID) {
                    return getByID(listID);
                });
            }
        }
    ]);
})();
