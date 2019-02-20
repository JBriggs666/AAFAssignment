angular
    .module('aafapp')
    .controller('videoAllVersionsCtrl', videoAllVersionsCtrl);

    function videoAllVersionsCtrl ($routeParams, videoData, $location, authentication, $route, $window) {
        var videoID = $routeParams.videoid;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
            $location.path('/login');
        } else {
            
            vm.fileLock = "";
            vm.username = authentication.currentUser().email;

            videoData.getAllVersions(videoID)
            .then(function successCallBack (result) {
                vm.videos = result.data;
                
                vm.fileLock = vm.videos.fileisLocked;
                vm.fileLockUser = vm.videos.fileLockedBy;
            }, function errorCallBack (result) {
                $location.path('/404');
            });
    
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

            vm.deleteVideo = function () {
                if (confirm('Are you sure you want to delete?  This process is irreversible')) {
                    videoData.deleteVideo(videoID)
                    .then(function successCallBack (result) {
                        $location.path('/');
                    }, function errorCallBack (result) {
                        $location.path('/404');
                    });
                }
            };
        }        
    };