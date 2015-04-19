/**
 * angular测试
 * Created by chao on 2015/4/15.
 */

var irApp = angular.module('irApp', [
    'ngRoute',
    'irControllers'
]);
irApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/todayList', {
                templateUrl: 'static/partials/test_normal.html',
                controller: 'taskListCtrl'
            }).
            when('/completedList', {
                templateUrl: 'static/partials/test_completed.html',
                controller: 'completedTaskCtrl'
            }).
            otherwise({
                redirectTo: '/todayList'
            });
    }]);

/**
 *Controller
 */
var irControllers = angular.module('irControllers', []);

irControllers.controller('taskListCtrl', function ($scope) {
    $scope.taskList = [];
    $scope.enter = function (event) {
        if (event.keyCode == 13) {
            $('.title').blur();
        }
    };
    $scope.addNewTask = function () {
        $scope.taskList.push({"title": "heiusf", "id": "123414"});
    };
    api.test.getTaskList(
        0,
        function (data) {
            $scope.$apply(function () {
                $scope.taskList = data;
            });
        });
});

irControllers.controller('completedTaskCtrl', function ($scope) {

});

function del(id) {
    console.log(id);
    $taskListScope = angular.element('#right-ul').scope();
    for (index = 0; index < $taskListScope.taskList.length; index++) {
        console.log($taskListScope.taskList[index]);
        if ($taskListScope.taskList[index].id == id) {
            console.log(index);
            $taskListScope.taskList.splice(index, 1);
        }
    }
    $taskListScope.$apply();
}