angular 
    .module('aafapp')
    .controller('updateVideoCtrl', updateVideoCtrl);

    function updateVideoCtrl (videoData, $routeParams, $location, authentication, $route) {

        var videoID = $routeParams.videoid;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            $location.path('/login');
        } else {
            
            vm.fileLock = "";
            vm.username = authentication.currentUser().email;

            videoData.getVideoDetails(videoID).then(function (result) {
                vm.video = result.data.videoData[0];

                vm.fileLock = result.data.fileisLocked;
                vm.fileLockUser = result.data.fileLockedBy;
                
                console.log(result.data);
                console.log(vm.fileLock);
                console.log(vm.fileLockUser);

                console.log(vm.video);
            });

            vm.updateVideo = function () {
                vm.formError = "";

                if (vm.video.videoFileName) {

                    videoData.updateVideo(videoID, vm.video).then(function (result) {
                        $location.path('/media/video/' + result.data._id + '/version');
                    });
                } else {
                    vm.formError = "Please enter all required fields";
                } 
            };

            vm.lockFile = function () {
                console.log("filelock clicked");

                var lockData = {
                    fileLock: true,
                    fileLockedBy: vm.username
                };

                console.log(lockData);

                videoData.lockFile(videoID, lockData).then(function (result) {
                    $route.reload();
                });
            };

            vm.unlockFile = function () {
                console.log("file unlock clicked");

                var username = '';

                var lockData = {
                    fileLock: 'false',
                    fileLockedBy: ''
                };

                console.log(lockData);

                videoData.lockFile(videoID, lockData).then(function (result) {
                    $route.reload();
                });
            };
        }

    };