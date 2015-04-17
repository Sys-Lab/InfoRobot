/**
 * app模块
 * irApp以及路由
 * Created by chao on 2015/4/17.
 */

var irApp;
irApp = angular.module('irApp', [
    'ngRoute',
    'irControllers'
]);

irApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/list/:date', {
                templateUrl: 'static/partials/list_date.html',
                controller: 'dateTaskCtrl'
            }).
            when('/completed', {
                templateUrl: 'static/partials/list_completed.html',
                controller: 'completedTaskCtrl'
            }).
            otherwise({
                redirectTo: '/list/today'
            });
    }]);