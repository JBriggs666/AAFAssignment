angular
    .module('aafapp')
    .controller('videoAllVersionsCtrl', videoAllVersionsCtrl);

    function videoAllVersionsCtrl ($routeParams, videoData) {
        var videoID = $routeParams.videoid;

        var vm = this;

        videoData.getAllVersions(videoID).then(function (result) {
            vm.videos = result.data;
            console.log(vm.videos);
        });
    };