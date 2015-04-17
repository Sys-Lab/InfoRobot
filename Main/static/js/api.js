/**
 * 与后端交互的API
 * 依赖jquery
 * Created by chao on 2015/4/11.
 */

API_ROOT = "app/";

var api =
{
    "user":
    {
        "test": function (name, password,callback)
        {
            $.post(API_ROOT+"test.php",
                {
                    "name":name,
                    "password":password
                },
                function(data,status)
                {
                    if(status=="success")
                        callback(data);
                    else
                        callback({"code":0,"message":status});
                });
        },
        "createUser": function ()
        {

        }
    },
    "task": {
        "createTask":function(taskContent,date,flag,callback){
            //TODO 具体路径
            $.post(API_ROOT+"",
                {
                    "taskContent":taskContent,
                    "date":date,
                    "flag":flag
                },
            function(data,status){
               if(status=="success"){
                   callback(eval(data));
               }else{
                   callback({"code":0,"message":status});
               }
            });
        },
        "requireTaskList":function(date,callback){
            //TODO 路径
            $.get(API_ROOT+"",
                {
                    "date":date
                },
            function(data,status){
                if(status=="success"){
                    callback(eval(data));
                }else{
                    callback({"code":0,"message":status});
                }
            });
        },
        "deleteTask":function(id,callback){
            $.post(API_ROOT+"",
                {
                    "id":id
                },
            function(data,status){
                if(status=="success"){
                    callback(eval(data));
                }else{
                    callback({"code":0,"message":status});
                }
            });
        },
        "changeOrder":function(id,order,callback){
            $.post(API_ROOT+"",
                {
                    "id":id,
                    "order":order
                },
            function(data,status){
                if(status=="success"){
                    callback(eval(data));
                }else{
                    callback({"code":0,"message":status});
                }
            });
        }
    },
    "test":{
        "getTaskList":function(date,callback){
            $.get(API_ROOT+"test.php",
                {
                "date":date
                },
                function (data,status) {
                    if(status=="success"){
                        callback(eval(data));
                    }
                    else
                        callback({"code":0,"message":status});
                });

        }
    }
};