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
    "task": {}
};