angular  
    .module('aafapp')
    .controller('videoDetailsViewCtrl', videoDetailsViewCtrl);

    function videoDetailsViewCtrl ($routeParams, videoData, $location, authentication, $route) {
        var videoID = $routeParams.videoid;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
            $location.path('/login');
        } else {

            vm.specificVersion = null;

            vm.fileLock = "";
            vm.username = authentication.currentUser().email;

            videoData.getVideoDetails(videoID).then(function (result) {
                vm.video = result.data;
                vm.videoID = videoID;

                vm.fileLock = vm.video.fileisLocked;
                vm.fileLockUser = vm.video.fileLockedBy;

                vm.videoVersion = vm.video.videoData[0].versionID;
                vm.deleteable = vm.videoVersion > 1;
                vm.videoDisplayDate = Date(vm.video.videoData[0].videoCreationDate);
            });
            
            vm.getSpecificVersion = function () {
                vm.specificVersion;
                $location.path('/media/video/' + vm.videoID + '/version/' + vm.specificVersion);
            };

            vm.lockFile = function () {
                // Send Boolean as a String so it doesn't affect error checking in API
                var lockData = {
                    fileLock: true,
                    fileLockedBy: vm.username
                };

                videoData.lockFile(videoID, lockData).then(function (result) {
                    $route.reload();
                });
            };

            vm.unlockFile = function () {
                // Send Boolean as a String so it doesn't affect error checking in API                
                var lockData = {
                    fileLock: 'false',
                    fileLockedBy: ''
                };

                videoData.lockFile(videoID, lockData).then(function (result) {
                    $route.reload();
                });
            };

            vm.updateVersion = function () {
                console.log('update clicked');
                $location.path('/media/video/' + videoID + '/update');
            };

            vm.deleteVersion = function () {
                if (confirm('Are you sure you want to delete?  This process is irreversible')) {
                    videoData.deleteVersion(videoID, vm.videoVersion).then(function () {
                        $location.path('/');
                    });
                }
            };
        }
    };

   