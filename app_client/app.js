angular.module('aafapp', ['ngRoute']);

function config ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/media/video/:videoid/version', {
            templateUrl: '/video-details/video-details.view.html',
            controller: 'videoDetailsViewCtrl',
            controllerAs: 'vm'
        })
        .when('/media/video/:videoid/version/all', {
            templateUrl: '/video-all-versions/video-all-versions.view.html',
            controller: 'videoAllVersionsCtrl',
            controllerAs: 'vm'
        })
        .when('/media/video/create', {
            templateUrl: '/create-video/create-video.view.html',
            controller: 'createVideoCtrl',
            controllerAs: 'vm'
        })
        .when('/media/video/:videoid/update', {
            templateUrl: '/update-video/update-video.view.html',
            controller: 'updateVideoCtrl',
            controllerAs: 'vm'
        })
        .otherwise({
            templateUrl: 'error/error.view.html',
            controller: 'errorCtrl',
            controllerAs: 'vm'
        });
    
        $locationProvider.html5Mode(true);
}

angular
    .module('aafapp')
    .config(['$routeProvider', '$locationProvider', config]);