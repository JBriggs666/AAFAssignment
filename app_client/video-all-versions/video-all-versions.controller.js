angular
    .module('aafapp')
    .controller('videoAllVersionsCtrl', videoAllVersionsCtrl);

    function videoAllVersionsCtrl ($routeParams, videoData, $location, authentication, $route, $window) {
        var videoID = $routeParams.videoid;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            $location.path('/login');
        } else {
            
            vm.fileLock = "";
            vm.username = authentication.currentUser().email;

            videoData.getAllVersions(videoID).then(function (result) {
                vm.videos = result.data;
                vm.videoDisplayDate = Date(vm.videos.videoData.videoCreationDate)
                
                vm.fileLock = vm.videos.fileisLocked;
                vm.fileLockUser = vm.videos.fileLockedBy;

                console.log(vm.videos);
            });
    
            vm.lockFile = function () {
                var lockData = {
                    fileLock: true,
                    fileLockedBy: vm.username
                };

                videoData.lockFile(videoID, lockData).then(function (result) {
                    $route.reload();
                });
            };

            vm.unlockFile = function () {                
                var lockData = {
                    fileLock: 'false',
                    fileLockedBy: ''
                };

                videoData.lockFile(videoID, lockData).then(function (result) {
                    $route.reload();
                });
            };

            vm.deleteVideo = function () {
                if (confirm('Are you sure you want to delete?  This process is irreversible')) {
                    videoData.deleteVideo(videoID).then(function () {
                        $location.path('/');
                    });
                }
            };
        }        
    };