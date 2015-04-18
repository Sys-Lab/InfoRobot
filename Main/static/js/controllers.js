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
    var date = 0;//日期 0 今天 1 明天 2 即将
    switch ($routeParams.date) {
        case "today":
            date = 0;
            break;
        case "tomorrow":
            date = 1;
            break;
        case "upcoming":
            date = 2;
            break;
        default :
            date = 0;
    }
    api.test.getTaskList(date, function (data) {
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
                api.task.createTask(content, date, 0, function (data) {
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
        } else {
            item.flag = "complete";
            item.editable = false;
        }

        //TODO API相关接口
    };
    $scope.removeTask = function (event) {
        var id = $(event.target).parent().attr('id');
        var index = getArrayIndexById($scope.taskList, id);
        $scope.taskList.splice(index,1);
        api.task.deleteTask(id,function(data){
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
                //TODO API
            }
        }
    };
    $scope.modifyTaskOrder = function (preId,id) {
        console.log(preId+"\n"+id);
    };
    $scope.modifyTaskDate = function (id,date) {
        var index=getArrayIndexById($scope.taskList,id);
        $scope.taskList.splice(index,1);
        $scope.$apply();
        //TODO API
        console.log("id-"+id+"\n"+"date-"+date);
    };
    $scope.removeAllCompletedTask = function () {
        //TODO 直接从后端拿数据
    }
});

irControllers.controller('completedTaskCtrl', function ($scope) {
    $scope.title="COMPLETED";
    $scope.taskList=[];
    api.task.requireTaskList(3,function(data){
        $scope.taskList=data;
    });
    $scope.delAllTask=function(){
        $scope.taskList.splice(0,$scope.taskList.length);
        //TODO API接口
    };
    $scope.uncheckTask=function(event){
        var id = $(event.target).parent().attr('id');
        var index = getArrayIndexById($scope.taskList, id);
        $scope.taskList.splice(index,1);
        //TODO API接口
    };
});