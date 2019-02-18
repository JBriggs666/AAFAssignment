angular
    .module('aafapp')
    .controller('videoAllVersionsCtrl', videoAllVersionsCtrl);

    function videoAllVersionsCtrl ($routeParams, videoData, $location, authentication) {
        var videoID = $routeParams.videoid;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            $location.path('/login');
        } else {
            videoData.getAllVersions(videoID).then(function (result) {
                vm.videos = result.data;
                console.log(vm.videos);
            });
    
            vm.deleteVideo = function () {
                console.log('video will be deleted');
                videoData.deleteVideo(videoID).then(function () {
                    $location.path('/');
                });
            };
        }        
    };