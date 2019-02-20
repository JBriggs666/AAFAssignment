angular 
    .module('aafapp')
    .controller('navigationCtrl', navigationCtrl);

    function navigationCtrl (authentication, $location) {

        var vm = this;

        vm.logout = function() {
            authentication.logout();
            $location.path('/login');
        };

        vm.isLoggedIn = function () {
            authentication.isLoggedIn();
        };        
    };