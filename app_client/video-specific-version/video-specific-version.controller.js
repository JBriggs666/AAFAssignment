angular 
    .module('aafapp')
    .controller('videoSpecificVersionCtrl', videoSpecificVersionCtrl);

    function videoSpecificVersionCtrl ($routeParams, videoData, authentication, $location) {
        var videoID = $routeParams.videoid;
        var videoVersion = $routeParams.versionnumber;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
            $location.path('/login');
        } else {

            videoData.getSpecificVersion(videoID, videoVersion)
            .then(function successCallBack (result) {
                vm.video = result.data;
                vm.videoID = videoID;
            }, function errorCallBack (result) {
                $location.path('/404');
            });

            vm.getSpecificVersion = function () {
                var version = vm.specificVersion;
                vm.specificVersion = "";
                $location.path('/media/video/' + videoID + '/version/' + version);
            };
        }        
    };