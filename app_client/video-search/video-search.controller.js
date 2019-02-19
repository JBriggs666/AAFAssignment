angular
    .module('aafapp')
    .controller('videoSearchCtrl', videoSearchCtrl);

    function videoSearchCtrl(videoData, authentication, $location) {

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
            $location.path('/login');
        } else {
        
        
        }
    };