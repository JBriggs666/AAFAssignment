angular
    .module('aafapp')
    .controller('videoSearchCtrl', videoSearchCtrl);

    function videoSearchCtrl(videoData, authentication, $location) {

        var vm = this;

        vm.isLoggedIn = authentication.isLoggedIn();

        if (!vm.isLoggedIn) {
            // return user to login screen if they are not logged in
            $location.path('/login');
        } else {
        
            var emptySearch = {
                videoFileName: '',
                videoEncodingType: '',
                videoAuthor: '',
                videoKeywords: ''
            };

            vm.search = angular.copy(emptySearch);

            vm.resetForm = function () {
                vm.formError = '';
                vm.search = angular.copy(emptySearch);
            };

            vm.performSearch = function () {
                vm.formError = '';

                // Stop search being run if no search parameters have been entered
                if (vm.search.videoFileName === '' && vm.search.videoEncodingType === '' && vm.search.videoAuthor === '' && vm.search.videoKeywords === '') {
                    vm.formError = 'Please enter at least one field for searching';
                    return false;
                }

                // build URL query string based on given search parameters
                var query = '?';

                if (vm.search.videoFileName !== '') {
                    query = query + 'videoFileName=' + vm.search.videoFileName;
                }

                if (vm.search.videoEncodingType !== '') {
                    if (query.valueOf() === '?') {
                        query = query + 'videoEncodingType=' + vm.search.videoEncodingType;
                    } else {
                        query = query + '&videoEncodingType=' + vm.search.videoEncodingType;
                    }
                }

                if (vm.search.videoAuthor !== '') {
                    if (query.valueOf() === '?') {
                        query = query + 'videoAuthor=' + vm.search.videoAuthor;
                    } else {
                        query = query + '&videoAuthor=' + vm.search.videoAuthor;
                    }
                }

                if (vm.search.videoKeywords !== '') {
                    if (query.valueOf() === '?') {
                        query = query + 'videoKeywords=' + vm.search.videoKeywords;
                    } else {
                        query = query + '&videoKeywords=' + vm.search.videoKeywords;
                    }
                }

                // redirect to search results page with query in URL, this will allow search results to still be available
                // if browser back button is used, and query's can be shared or saved based on URL 
                $location.url('/media/video/search-results' + query);
            };
        
        }
    };