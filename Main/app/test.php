<?php
$date=$_GET["date"];

if($date==0){
$taskList='[
{"title": "今天","id":"1234","flag":"uncomplete"},
{"title": "不知道","id":"2345","flag":"complete"},
{"title": "干嘛好呢","id":"3456","flag":"uncomplete"}
]';
}else if($date==1){
$taskList='[
{"title": "明天","id":"1234","flag":"complete"},
{"title": "不知道","id":"2345","flag":"complete"},
{"title": "干嘛好呢","id":"3456","flag":"complete"}
]';
}else if($date==2){
$taskList='[
{"title": "即将","id":"1234","flag":"complete"},
{"title": "不知道","id":"2345","flag":"complete"},
{"title": "干嘛好呢","id":"3456","flag":"complete"}
]';
}else{
$taskList='[
{"title": "已完成","id":"1234","flag":"complete"},
{"title": "不知道","id":"2345","flag":"complete"},
{"title": "干嘛好呢","id":"3456","flag":"complete"}
]';
}

echo $taskList;
?>