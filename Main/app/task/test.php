<?php
	$con=mysql_connect("localhost:3306","root","root");
	if(!$con) echo "fail" . mysql_error();
	mysql_select_db("Inforobot",$con);
	$sql="INSERT INTO task(taskname, taskdateyear, taskdatemonth, taskdateday, tasktype,
		taskcheck,user_id) VALUES ('123',2000,12,12,1,1,1)";
	$c=mysql_query($sql,$con);
	if($c) echo "Yes";
		else echo "Fail" . mysql_erro();
?>
	