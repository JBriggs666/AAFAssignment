angular 
    .module('aafapp')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl (videoData, authentication, $location) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            $location.path('/login');
        } else {
            videoData.getAllVideos().then(function (result) {
                vm.videos = result.data;
                vm.noOfVideos = vm.videos.length;
            }); 
        }
    };
