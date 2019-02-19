angular 
    .module('aafapp')
    .controller('updateVideoCtrl', updateVideoCtrl);

    function updateVideoCtrl (videoData, $routeParams, $location, authentication) {

        var videoID = $routeParams.videoid;

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            $location.path('/login');
        } else {
            
            videoData.getVideoDetails(videoID).then(function (result) {
                vm.video = result.data.videoData[0];

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
        }

    };