angular
    .module('aafapp')
    .service('videoData', videoData);

    videoData.$inject = ['$http', 'authentication'];

    function videoData ($http, authentication) {

        // Create
        var addVideo = function (videoData) {
            return $http.post('/api/media/video', videoData, {
                headers : {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        // Read
        var getAllVideos = function () {
            return $http.get('/api/media/video', {
                headers : {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getVideoDetails = function (videoID) {
            return $http.get('/api/media/video/' + videoID + '/version', {
                headers : {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getAllVersions = function (videoID) {
            return $http.get('/api/media/video/' + videoID, {
                headers : {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var getSpecificVersion = function(videoID, videoVersion) {
            return $http.get('/api/media/video/' + videoID + '/version/' + videoVersion, {
                headers : {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        }

        // Update 
        var updateVideo = function (videoID, videoData) {
            return $http.put('/api/media/video/' + videoID, videoData, {
                headers : {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var lockFile = function (videoID, lockData) {            
            return $http.patch('/api/media/video/' + videoID, lockData, {
                headers: {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        // Delete
        var deleteVersion = function (videoID, videoVersion) {
            return $http.delete('/api/media/video/' + videoID + '/version/' + videoVersion, {
                headers : {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        var deleteVideo = function (videoID) {
            return $http.delete('/api/media/video/' + videoID, {
                headers : {
                    Authorization: 'Bearer ' + authentication.getToken()
                }
            });
        };

        return {
            addVideo: addVideo,
            getAllVideos: getAllVideos,
            getVideoDetails: getVideoDetails,
            getAllVersions: getAllVersions,
            getSpecificVersion: getSpecificVersion,            
            updateVideo: updateVideo,
            lockFile: lockFile,
            deleteVersion: deleteVersion,
            deleteVideo: deleteVideo
        };
    };