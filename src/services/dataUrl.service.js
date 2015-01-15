(function() {
    'use strict';
    var app = angular.module('practiceLog');

    app.service('dataUrl', ['$firebase', 'lodash',
        function($firebase, _) {
            var self = this;
            self.consts = {
                'exercises': 'exercises',
                'resolveRequireAuths': 'users',
                'users': 'users',
                'lists': 'lists',
                'fireBaseUrl': 'https://glowing-inferno-4287.firebaseio.com/'
            };
            self.sync = sync;
            self.getRef = getRef;

            function sync(arrayOfArguments) {
                var ref = getRef(arrayOfArguments);
                var syncRes = $firebase(ref);
                return syncRes;
            }

            function getRef(arrayOfArguments) {
                var ref = new Firebase(self.consts.fireBaseUrl);
                if (angular.isObject(arrayOfArguments)) {
                    try {
                        _.forEach(arrayOfArguments, function(arg) {
                            ref = ref.child(arg);
                        });
                    }
                    catch (e) {
                        console.log("arg = '" + arrayOfArguments + "'");
                        debugger;
                    }
                }
                return ref;
            }
        }
    ]);
})();
