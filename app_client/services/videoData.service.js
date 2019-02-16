angular
    .module('aafapp')
    .service('videoData', videoData);

    videoData.$inject = ['$http'];

    function videoData ($http) {

        var getVideoDetails = function (videoID) {
            return $http.get('/api/media/video/' + videoID + '/version');
        };

        var getAllVersions = function (videoID) {
            return $http.get('/api/media/video/' + videoID);
        };

        var addVideo = function (videoData) {
            return $http.post('/api/media/video', videoData);
        };

        var updateVideo = function (videoID, videoData) {
            return $http.put('/api/media/video/' + videoID, videoData);
        };

        return {
            getVideoDetails: getVideoDetails,
            getAllVersions: getAllVersions,
            addVideo: addVideo,
            updateVideo: updateVideo
        };
    };