angular 
    .module('aafapp')
    .controller('videoSpecificVersionCtrl', videoSpecificVersionCtrl);

    function videoSpecificVersionCtrl ($routeParams, videoData, authentication, $location) {
        var videoID = $routeParams.videoid;
        var videoVersion = $routeParams.versionnumber;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            $location.path('/login');
        } else {
            videoData.getSpecificVersion(videoID, videoVersion).then(function (result) {
                console.log(result.data);
                vm.video = result.data;
                vm.videoID = videoID;
            });
        }        
    };