angular  
    .module('aafapp')
    .controller('videoViewCtrl', videoViewCtrl);

    function videoViewCtrl ($routeParams, $http) {
        let videoID = $routeParams.videoid;

        var vm = this;

        $http.get('/api/media/video/' + videoID + '/version').then(function (result) {
            vm.video = result.data;

            console.log(vm.video);
        });
    };

   