/**
 * controller模块
 * 包含dateTaskCtrl与completedTaskCtrl
 * Created by chao on 2015/4/17.
 */
var irControllers;
irControllers = angular.module('irControllers', []);

var getArrayItemById = function (array, id) {
    for (var index in array) {
        if (array[index].id == id)return array[index];
    }
};
var getArrayIndexById = function (array, id) {
    for (var index in array) {
        if (array[index].id == id)return index;
    }
};

irControllers.controller('dateTaskCtrl', function ($scope, $routeParams) {
    //储存几个dom对象
    var $taskInput = $('#add-input');

    $scope.title = $routeParams.date.toUpperCase();
    $scope.taskList = [];
    $scope.dateNum = 0;//日期 0 今天 1 明天 2 即将
    switch ($routeParams.date) {
        case "today":
            $scope.dateNum = 0;
            break;
        case "tomorrow":
            $scope.dateNum = 1;
            break;
        case "upcoming":
            $scope.dateNum = 2;
            break;
        default :
            $scope.dateNum = 0;
    }
    api.test.getTaskList($scope.dateNum, function (data) {
        //添加editable属性
        for (var index in data) {
            data[index].editable = (data[index].flag == "uncomplete");
        }
        $scope.taskList = data;
        $scope.$apply();
    });
    $scope.addNewTask = function (event) {
        if (event.keyCode == 13) {
            var content = $taskInput.val();
            $taskInput.blur();
            $taskInput.val('');
            if (content != "") {
                console.log("addNewTask--" + content);
                api.task.createTask(content, $scope.dateNum, 0, function (data) {
                    $scope.taskList.push({"title": content, "id": data.id, "flag": "uncomplete", "editable": true});
                });
            }
        }
    };
    $scope.checkTask = function (event) {
        var id = $(event.target).parent().attr('id');
        var item = getArrayItemById($scope.taskList, id);
        if (item.flag == "complete") {
            item.flag = "uncomplete";
            item.editable = true;
            api.task.uncheckTask(id,function(data){});
        } else {
            item.flag = "complete";
            item.editable = false;
            api.task.checkTask(id, function (data) {});
        }
    };
    $scope.removeTask = function (event) {
        var id = $(event.target).parent().attr('id');
        var index = getArrayIndexById($scope.taskList, id);
        $scope.taskList.splice(index,1);
        api.task.removeTask(id,function(data){
            if(data.code==0){
                alert(data);
            }
        });
    };
    $scope.modifyTaskContent = function (event) {
        if (event.keyCode == 13) {
            //移除回车导致的br
            $(event.target).children().remove();
            $('.task-content').blur();

            var id = $(event.target).parent().attr('id');
            var item=getArrayItemById($scope.taskList,id);
            var content = event.target.innerText.replace(/[\r\n]/g, "");
            var isChange = false;
            if (item.title != content)isChange = true;
            if (isChange) {
                console.log("content已被改变--" + content);
                api.task.modifyTaskContent(id.content,function(data){});
            }
        }
    };
    $scope.modifyTaskOrder = function (preId,id) {
        console.log(preId+"\n"+id);
        api.task.modifyTaskOrder(preId,id,function(data){});
    };
    $scope.modifyTaskDate = function (id,date) {
        var index=getArrayIndexById($scope.taskList,id);
        $scope.taskList.splice(index,1);
        $scope.$apply();
        console.log("id-"+id+"\n"+"date-"+date);
        api.task.modifyTaskDate(id,date,function(data){});
    };
    $scope.removeAllCompletedTask = function () {
        console.log("移除所有已完成任务");
        api.task.removeAllCompletedTask($scope.dateNum,function(data){
            $scope.taskList=data.list;
        });
    }
});

irControllers.controller('completedTaskCtrl', function ($scope) {
    $scope.title="COMPLETED";
    $scope.taskList=[];
    api.test.getTaskList(3,function(data){
        $scope.taskList=data;
        $scope.$apply();
    });
    $scope.delTask=function(event){
        var id = $(event.target).parent().attr('id');
        var index = getArrayIndexById($scope.taskList, id);
        $scope.taskList.splice(index,1);
        api.task.delTask(id,function(data){});
    };
    $scope.delAllTask=function(){
        $scope.taskList.splice(0,$scope.taskList.length);
        api.task.delAllTask(function(data){});
    };
    $scope.uncheckTask=function(event){
        var id = $(event.target).parent().attr('id');
        var index = getArrayIndexById($scope.taskList, id);
        $scope.taskList.splice(index,1);
        api.task.uncheckTask(id,function(data){});
    };
});