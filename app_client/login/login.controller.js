angular
    .module('aafapp')
    .controller('loginCtrl', loginCtrl);

    function loginCtrl ($location, authentication) {

        var vm = this;

        var credentials = {
            email : "",
            password : ""
        };

        vm.credentials = angular.copy(credentials);

        vm.onSubmit = function () {
            vm.formError = "";
            if (!vm.credentials.email || !vm.credentials.password) {
                vm.formError = "All fields required";
                return false;
            } else {
                vm.login();
            }            
        };

        vm.login = function () {
            authentication
            .login(vm.credentials)
            .then(function successCallBack (response) {
                $location.path('/');
            }, function errorCallBack (response) {
                // return to login page if something went wrong, display response message and reset credentials
                $location.path('/login');
                vm.formError = response.data.message;
                vm.credentials = angular.copy(credentials);                
            });
        }

    };