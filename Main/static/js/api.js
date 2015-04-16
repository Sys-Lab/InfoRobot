/**
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
                        callback({"error":1,"message":"Connection failed."});
                });
        },
        "createUser": function ()
        {

        }
    },
    "task": {},
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
                        callback({"error":1,"message":"Connection failed."});
                });

        }
    }
};