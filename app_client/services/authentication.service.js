angular
    .module('aafapp')
    .service('authentication', authentication);

    authentication.inject = ['$http', '$window'];

    function authentication ($http, $window) {

        var saveToken = function (token) {
            $window.localStorage['aafapp-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['aafapp-token'];
        };

        var login = function (user) {
            return $http.post('/api/users/login', user).then(function (data) {
                console.log(data);
                saveToken(data.data.token);
            });
        };

        var logout = function () {
            $window.localStorage.removeItem('aafapp-token');
        };

        var isLoggedIn = function () {
            var token = getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
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