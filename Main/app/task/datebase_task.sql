CREATE TABLE Task(
		taskname varchar(200) NOT NULL,
		taskdateyear varchar(10) NOT NULL,
		taskdatemonth varchar(10) NOT NULL,
		taskdateday varchar(10) NOT NULL,
		tasktype int NOT NULL, 
		taskcheck int NOT NULL,
		taskid int NOT NULL PRIMARY KEY AUTO_INCREMENT,
		user_id int  DEFAULT NULL,
		FOREIGN KEY (user_id) REFERENCES users(id)
		)