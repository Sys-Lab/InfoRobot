<?php
class opmysql{
	private $host = 'localhost:3306';
	private $name = 'root';	
	private $pwd = 'root';	
	private $dBase = 'inforobot';
	private $conn = '';						//数据库链接资源
	private $result = '';					//结果集
	private $msg = '';						//返回结果
	private $rowsNum = 0;					//返回结果数
	private $rowsArray = array();			//返回结果数组
	//初始化类
	function __construct(){
		$this->init_conn();
	}
	//链接数据库
	public function init_conn(){
		$this->conn=mysql_connect($this->host,$this->name,$this->pwd);
		mysql_select_db($this->dBase,$this->conn);
	}
	//查询结果
	public function mysql_query_rst($sql){
		if($this->conn == ''){
			$this->init_conn();
		}
		$this->result = mysql_query($sql,$this->conn);
	}
	//取得查询结果数
	public function getRowsNum($sql){
		$this->mysql_query_rst($sql);
		if(mysql_errno() == 0){
			return @mysql_num_rows($this->result);
		}else{
			return '';
		}	
	}
	//取得记录数组（单条记录）
	public function getRowsRst($sql){
		$this->mysql_query_rst($sql);
		if(mysql_error() == 0){
			$this->rowsRst = mysql_fetch_array($this->result,MYSQL_ASSOC);
			return $this->rowsRst;
		}else{
			return '';
		}
	}
	//取得记录数组（多条记录）
	public function getRowsArray($sql){
		$this->mysql_query_rst($sql);
		if(mysql_errno() == 0){
			while($row = mysql_fetch_array($this->result,MYSQL_ASSOC)) {
				$this->rowsArray[] = $row;
			}
			return $this->rowsArray;
		}else{
			return '';
		}
	}
	//更新、删除、添加记录数
	public function uidRst($sql){
		if($this->conn == ''){
			$this->init_conn();
		}
		mysql_query($sql);
		$this->rowsNum = mysql_affected_rows();
		if(mysql_errno() == 0){
			return $this->rowsNum;
		}else{
			return '';
		}
	}
	
	//错误信息
	public function msg_error(){
		if(mysql_errno() != 0) {
			$this->msg = mysql_error();
		}
		return $this->msg;
	}

	//关闭数据库
	public function close_conn(){
		$this->close_rst();
		mysql_close($this->conn);
		$this->conn = '';
	}
}
