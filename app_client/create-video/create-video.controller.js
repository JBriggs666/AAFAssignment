angular 
    .module('aafapp')
    .controller('createVideoCtrl', createVideoCtrl);

    function createVideoCtrl (videoData, $location, authentication) {
        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
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
                videoSize: "",
                videoKeywords: ""
            };

            vm.video = angular.copy(emptyVideo);

            vm.addVideo = function () {
                vm.formError = "";

                if (vm.video.videoFileName) {
                    vm.video.videoAuthor = authentication.currentUser().email;

                    videoData.addVideo(vm.video)
                    .then(function successCallBack (result) {
                        $location.path('/media/video/' + result.data._id + '/version');
                    }, function errorCallBack (result) {
                        $location.path('/404');           
                    });

                } else {
                    vm.formError = "Please enter all required fields";
                }
            };

            vm.resetForm = function () {
                vm.formError = "";
                vm.video = angular.copy(emptyVideo);
            };
        }
    };