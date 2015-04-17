/**
 * controller模块
 * 包含dateTaskCtrl与completedTaskCtrl
 * Created by chao on 2015/4/17.
 */
var irControllers;
irControllers = angular.module('irControllers', []);

irControllers.controller('dateTaskCtrl', function ($scope,$routeParams) {
    if($routeParams.date=="today"){
        $scope.task="上午";
    }
});

irControllers.controller('completedTaskCtrl', function ($scope) {

});