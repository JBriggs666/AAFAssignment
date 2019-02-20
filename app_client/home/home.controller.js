angular 
    .module('aafapp')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl (videoData, authentication, $location) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
            $location.path('/login');
        } else {

            videoData.getAllVideos()
            .then(function successCallBack (result) {
                vm.videos = result.data;
                vm.noOfVideos = vm.videos.length;
            }, function errorCallBack (result) {
                $location.path('/404');
            }); 
        }
    };
