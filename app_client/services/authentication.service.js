angular
    .module('aafapp')
    .service('authentication', authentication);

    authentication.inject = ['$http', '$window'];

    function authentication ($http, $window) {

        var saveToken = function (token) {
            // save JWT to local storage
            $window.localStorage['aafapp-token'] = token;
        };

        var getToken = function () {
            // get JWT from local storage
            return $window.localStorage['aafapp-token'];
        };

        var login = function (user) {
            return $http.post('/api/users/login', user).then(function (data) {
                saveToken(data.data.token);
            });
        };

        var logout = function () {
            // JWT will not be invalidated by API, but wil be removed from local storage, so website can no longer use it.
            $window.localStorage.removeItem('aafapp-token');
        };

        var isLoggedIn = function () {
            var token = getToken();

            if (token) {
                // decode JWT to get user details and check that JWT has not expired
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                // decode JWT and return user details fro web app to use
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    id : payload._id,
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        return {
            saveToken: saveToken,
            getToken: getToken,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser
        };
    };