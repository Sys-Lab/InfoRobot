<? php
	include_once "conn_task.php"
	include_once "\users\user.php"
class task
{	
	$userid=Getid();
	private TestId($id){
		if($id<=0) die('{"code":"0","message":"Invaild Id"}');
		$result=mysql_query("SELECT *FROM task WHERE taskid=$id");
		if(!$result) die('{"code":"0","message":"Invaild Id"}');
	}
	private Change($id,$key){
		mysql_query("UPDATE task SET tasktype=$key WHERE taskid=$id",$con);
	}  
	public function CreatTask($content,$date,$flag){
		if($content==''||$flag==''||($flag!='Complete'&&$flag!='Uncomplete'))
			die('{"code":0,"message":"Invaild Input"}');
		if($date>2) 
			die('{"code":0,"message":"Invaild Date"}');
		$year=date("Y");
		$month=date("m");
		$day=date("d");
		if($flag=='Complete') $check=1;
			else $check=0;
		$sql="INSERT INTO task (taskname taskdateyear taskdatemonth 
		taskdateday,tasktype taskcheck,user_id)
		VALUES 
			($content',$year,$month,$day,$date,$check,$userid)";
		if(!mysql_query($sql,$con))
			die('{"code":0,"message":"Create Fail"}');
				else echo '{"code":1,"message":"Creat Success"}'; 
	}
	public function RequireTaskList($type){
		if($type<0||$type>3) die('{"code":0,"message":"Invaild Date"}');
		$result=mysql_query("SELECT * FROM task WHERE tasktype=$type user_id=$userid");
		while($row=mysql_fetch_array($result)){
			$list[++$cnt]->content=$row['taskname'];
			$list[$cnt]->year=$row['taskdateday'];
			$list[$cnt]->month=$row['taskdatemonth'];
			$list[$cnt]->day=$row['taskdateday'];
			$list[$cnt]->type=$row['taskdatetype'];
			$list[$cnt]->id=$row['taskid'];
		}
		$result=array("code"=>"1","message"=>"Retrun Success","list"=>"$list");
		echo json_decode($result);
	}
	public function DeleteTask($id){
		if($id<=0) die('{"code":0,"message":"Invaild Task Id"}');
		$result=mysql_query("SELECT *FROM task WHERE taskid=$id");
		if(!$result) die('{"code":0,"message":"Task Id does not exist"}');
		$sql="DELETE FROM task WHERE tasid=$id";
		if(!mysql_query($sql,$con)) die('{"code":"0","message":"Task Del Failed"}');
			else echo '{"code":"1","message":"Del Success"}' ;
	}
	public function CheckId($id){
		TestId($id);
		$result=mysql_query("SELECT * FROM task WHERE taskid=$id",$con);
		$row=mysql_fetch_array($result);
		mysql_query("UPDATE task SET taskcheck=1 WHERE taskid=$id",$con);
		echo '{"code":"1","message":"Check Success"}';	
	}
	public function UnCheckId($id){
		TestId($id);
		$result=mysql_query("SELECT * FROM task WHERE taskid=$id",$con);
		$row=mysql_fetch_array($result);
		mysql_query("UPDATE task SET taskcheck=0 WHERE taskid=$id",$con);
		echo '{"code":"1","message":"UnCheck Success"}';
	}
	public function UpdateTask(){
		$year=date("Y");
		$month=date("m");
		$day=date("d");
		$result=mysql_query("SELECT * FROM task WHERE user_id=$userid",$con);
		while($row=mysql_fetch_array($result)){
			if($row['year']>$year){Change($row['taskid'],2);return 0;}
			if($row['year']<$year){Change($row['taskid'],0);return 0;}
			if($row['month']>$month){Change($row['taskid'],2);return 0;}
			if($row['month']<$month){Change($row['taskid'],0);return 0;}
			if($row['day']-$day>1){Change($row['taskid'],2);return 0;}
			if($row['day']-$day==1){Change($row['taskid'],1);return 0;}
			if($row]'day']<=$day){Change($row['taskid'],0);return 0;}
		}
		echo '{"code":"0","message":"Update Success"}' ;
	}
	public RemoveTask($id){
		$result=mysql_query("SELECT * FROM task where taskid=$id",$con);
		if(!$result) die('{"code":"0","message":"Invaild Taskid"}');
		mysql_query("UPDATE task SET tasktype=3 WHERE id=$row['taskid']",$con);
		echo '{"code":"1","message":"Remove Success"}' ;		
	}
	public RemoveAllCompleteTask(){
		$result=mysql_query("SELECT * FROM task WHERE user_id=$userid",$con);
		while($row=mysql_fetch_array($result)){
			if($row['checid']==1) 
				mysql_query("UPDATE task SET tasktype=3 WHERE taskid=$row['taskid']",$con);
		}
		echo '{"code":"0","message":"Remove Success"}' ;
	}
	public DelAllTask(){
		$result=mysql_query("SELECT * FROM task WHERE user_id=$userid",$con);
		while($row=mysql_fetch_array($result){
			if($row['tasktype']==3){
				mysql_query("DELETE FROM task WHERE taskid=$row['taskid']",$con);
			}
		}
	}
	public ModifyTaskContent($newcontent,$task_id){
		$result=mysql_query("SELECT * FROM task WHERE taskid=$task_id",$con);
		if(!$result) die('{"code":"0","message":"Invaild Taskid"}');
		mysql_query("UPDATE task SET taskname=$newcontent WHERE taskid=$task_id",$con);
		echo '{"code":"1","message":"Modify Success"}' ;
	}
	public ModifyTaskDate($newdate,$task_id){
		$result=mysql_query("SELECT * FROM task WHERE taskid=$task_id",$con);
		if(!$result) die('{"code":"0","message":"Invaild Taskid"}');
		mysql_query("UPDATE taske SET tasktype=$newdate WHERE taskid=$task_id",$con);
		echo '{"code":"1","message":"Modify Success"}' ;
	}
	public ModifyTaskOrder($preid,$task_id){ 
		//暂时没想好怎么实现 先放着...
		echo '{"code":"1","message":"Modify Success"}' ;
	}
}