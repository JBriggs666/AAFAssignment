angular 
    .module('aafapp')
    .controller('createVideoCtrl', createVideoCtrl);

    function createVideoCtrl (videoData, $location) {
        var vm = this;

        var emptyVideo = {
            videoFileName: "",
            videoLength: "",
            videoFrameWidth: 0,
            videoFrameHeight: 0,
            videoDataRate: "",
            videoTotalBitRate: "",
            videoFrameRate: "",
            videoEncodingType: "",
            VideoAudioBitRate: "",
            videoAudioChannels: 0,
            videoAudioSampleRate: "",
            videoSize: ""
        };

        vm.video = angular.copy(emptyVideo);

        vm.addVideo = function () {
            if (vm.video.videoFileName) {
                videoData.addVideo(vm.video)
                    .then(function (result) {
                        $location.path('/media/video/' + result.data._id + '/version');
                    });
            }
        }

    }