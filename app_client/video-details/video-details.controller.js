angular  
    .module('aafapp')
    .controller('videoDetailsViewCtrl', videoDetailsViewCtrl);

    function videoDetailsViewCtrl ($routeParams, videoData) {
        var videoID = $routeParams.videoid;

        var vm = this;

        videoData.getVideoDetails(videoID).then(function (result) {
            vm.video = result.data;
            vm.videoID = videoID;

            console.log(vm.video);
        });
    };

   