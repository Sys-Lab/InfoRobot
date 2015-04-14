<?php
	$con=mysql_connect("localhost","root","root");
	if(!$con) die("Could not connect". mysql_error());
	if(mysql_query("CREATE DATABASE InfoRobot",$con)){
		echo "Datebase created";
	}else echo "Error" . mysql_error();
	mysql_select_db("InfoRobot",$con);
	$sql="CREAT TABLE Task(
		taskname varchar(200),
		taskdateyear varchar(10),
		taskdatemonth varchar(10),
		taskdateday varchar(10),
		tasktype int
		)";
	$c=mysql_query($sql,$con); 
	if(!$c) echo "FAILED";
	mysql_close($con);
?>
