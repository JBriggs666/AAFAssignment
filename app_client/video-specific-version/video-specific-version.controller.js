angular 
    .module('aafapp')
    .controller('videoSpecificVersionCtrl', videoSpecificVersionCtrl);

    function videoSpecificVersionCtrl ($routeParams, videoData) {
        var videoID = $routeParams.videoid;
        var videoVersion = $routeParams.versionnumber;

        var vm = this;

        videoData.getSpecificVersion(videoID, videoVersion).then(function (result) {
            console.log(result.data);
            vm.video = result.data;
            vm.videoID = videoID;
        });
    };