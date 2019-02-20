angular
    .module('aafapp')
    .controller('errorCtrl', errorCtrl);

    function errorCtrl ($location) {       
        
        var vm = this;

        vm.goHome = function () {
            $location.path('/');
        }
    };