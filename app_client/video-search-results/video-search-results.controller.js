angular
    .module('aafapp')
    .controller('videoSearchResultsCtrl', videoSearchResultsCtrl);

    function videoSearchResultsCtrl (videoData, authentication, $location, $window) {

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();
        vm.noData = false;

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
            $location.path('/login');
        } else {
            // get query string form page URL so it can be passed to videoData and then to API
            // this means that if navigating away from the results page and then using the browser back 
            // button, the search results will still be displayed            
            var query = $window.location.search;

            videoData.videoSearch(query)
            .then(function successCallBack (result) {
                vm.noData = false;
                vm.videos = result.data;
            }, function errorCallBack (result) {
                // return to login page if something went wrong, display response message and reset credentials
                // $location.path('/login');
                // vm.formError = response.data.message;
                // vm.credentials = angular.copy(credentials); 
                vm.noData = true;  
                vm.error = result.data.message;
                console.log("error: " + result.data.message);             
            });
        }
    };