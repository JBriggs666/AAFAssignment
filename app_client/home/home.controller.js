angular 
    .module('aafapp')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl (videoData) {
        var vm = this;

        videoData.getAllVideos().then(function (result) {
            vm.videos = result.data;
            vm.noOfVideos = vm.videos.length;
        }); 
    };
