angular 
    .module('aafapp')
    .controller('homeCtrl', homeCtrl);

    function homeCtrl ($http) {
        var vm = this;

        vm.videos = [];

        vm.noOfVideos;

        var data = [];

        $http.get('/api/media/video').then(function (result) {
            vm.videos = result.data;

            console.log(vm.videos);

            vm.noOfVideos = vm.videos.length;

            console.log(vm.videos[0].videoData[0].videoFileName);
        });
        

        
    };
