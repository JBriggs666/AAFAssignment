angular
    .module('aafapp')
    .service('videoData', videoData);

    videoData.$inject = ['$http'];

    function videoData ($http) {

        // Create
        var addVideo = function (videoData) {
            return $http.post('/api/media/video', videoData);
        };

        // Read
        var getAllVideos = function () {
            return $http.get('/api/media/video');
        };

        var getVideoDetails = function (videoID) {
            return $http.get('/api/media/video/' + videoID + '/version');
        };

        var getAllVersions = function (videoID) {
            return $http.get('/api/media/video/' + videoID);
        };

        var getSpecificVersion = function(videoID, videoVersion) {
            return $http.get('/api/media/video/' + videoID + '/version/' + videoVersion);
        }

        // Update 
        var updateVideo = function (videoID, videoData) {
            return $http.put('/api/media/video/' + videoID, videoData);
        };

        // Delete
        var deleteVersion = function (videoID, videoVersion) {
            return $http.delete('/api/media/video/' + videoID + '/version/' + videoVersion);
        };

        var deleteVideo = function (videoID) {
            return $http.delete('/api/media/video/' + videoID);
        };

        return {
            addVideo: addVideo,
            getAllVideos: getAllVideos,
            getVideoDetails: getVideoDetails,
            getAllVersions: getAllVersions,
            getSpecificVersion: getSpecificVersion,            
            updateVideo: updateVideo,
            deleteVersion: deleteVersion,
            deleteVideo: deleteVideo
        };
    };