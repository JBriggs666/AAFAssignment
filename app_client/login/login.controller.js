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
                console.log(authentication.currentUser());
                $location.path('/');
            }, function errorCallBack (response) {
                // TODO: Add validation Here
                vm.credentials = angular.copy(credentials);                
            });
        }

    };