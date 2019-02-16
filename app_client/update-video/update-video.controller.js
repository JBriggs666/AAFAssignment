angular 
    .module('aafapp')
    .controller('updateVideoCtrl', updateVideoCtrl);

    function updateVideoCtrl (videoData, $routeParams, $location) {

        var videoID = $routeParams.videoid;

        var vm = this;

        videoData.getVideoDetails(videoID).then(function (result) {
            vm.video = result.data.videoData[0];

            console.log(vm.video);
        });

        vm.updateVideo = function () {
            if (vm.video.videoFileName) {

                videoData.updateVideo(videoID, vm.video).then(function (result) {
                    $location.path('/media/video/' + result.data._id + '/version');
                });
            }    
        };

    };