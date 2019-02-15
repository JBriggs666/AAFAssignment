angular.module('aafapp', ['ngRoute']);

function config ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/media/video/:videoid/version', {
            templateUrl: '/video/video-details.view.html',
            controller: 'videoViewCtrl',
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