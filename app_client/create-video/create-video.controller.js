angular 
    .module('aafapp')
    .controller('createVideoCtrl', createVideoCtrl);

    function createVideoCtrl (videoData, $location, authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            $location.path('/login');
        } else {

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
                vm.formError = "";
                
                if (vm.video.videoFileName) {
                    videoData.addVideo(vm.video)
                        .then(function (result) {
                            $location.path('/media/video/' + result.data._id + '/version');
                        });
                } else {
                    vm.formError = "Please enter all required fields";
                }
            };
        }
    };