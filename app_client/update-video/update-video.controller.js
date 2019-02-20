angular 
    .module('aafapp')
    .controller('updateVideoCtrl', updateVideoCtrl);

    function updateVideoCtrl (videoData, $routeParams, $location, authentication, $route) {

        var videoID = $routeParams.videoid;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
            $location.path('/login');
        } else {
            
            vm.fileLock = "";
            vm.username = authentication.currentUser().email;

            videoData.getVideoDetails(videoID).then(function (result) {
                vm.video = result.data.videoData[0];

                vm.fileLock = result.data.fileisLocked;
                vm.fileLockUser = result.data.fileLockedBy;                
            });

            vm.updateVideo = function () {
                vm.formError = "";

                if (vm.video.videoFileName) {

                    videoData.updateVideo(videoID, vm.video)
                    .then(function successCallBack (result) {
                        $location.path('/media/video/' + result.data._id + '/version');
                    }, function errorCallBack (result) {
                        $location.path('/404');
                    });
                    
                } else {
                    vm.formError = "Please enter all required fields";
                } 
            };

            vm.lockFile = function () {                
                // Send Boolean as a String so it doesn't affect error checking in API
                var lockData = {
                    fileLock: 'true',
                    fileLockedBy: vm.username
                };

                videoData.lockFile(videoID, lockData)
                .then(function successCallBack (result) {
                    $route.reload();
                }, function errorCallBack (result) {
                    $location.path('/404');
                });
            };

            vm.unlockFile = function () {
                // Send Boolean as a String so it doesn't affect error checking in API
                var lockData = {
                    fileLock: 'false',
                    fileLockedBy: ''
                };

                videoData.lockFile(videoID, lockData)
                .then(function successCallBack (result) {
                    $route.reload();
                }, function errorCallBack (result) {
                    $location.path('/404');
                });
            };
        }

    };