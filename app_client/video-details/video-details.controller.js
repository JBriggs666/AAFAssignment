angular  
    .module('aafapp')
    .controller('videoDetailsViewCtrl', videoDetailsViewCtrl);

    function videoDetailsViewCtrl ($routeParams, videoData, $location) {
        var videoID = $routeParams.videoid;

        var vm = this;

        videoData.getVideoDetails(videoID).then(function (result) {
            vm.video = result.data;
            vm.videoID = videoID;
            vm.videoVersion = vm.video.videoData[0].versionID;

            console.log(vm.video);
        });

        vm.deleteVersion = function () {
            console.log('delete clicked');
            videoData.deleteVersion(vm.videoID, vm.videoVersion).then(function (result) {
                console.log(result);
                // FIXME: not re-routing after deletion, for some reason. Also need to accoutn for fact it may be only version.
                $location.path('/media/video/' + videoID + '/version');
            });
        };
    };

   