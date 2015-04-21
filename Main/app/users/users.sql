CREATE TABLE users(
	id int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT ,
	uesrname varchar(20) NOT NULL ,
	email varchar(50) NOT NULL UNIQUE,
	password varchar(20) NOT NULL,
	phone varchar(20) NOT NULL,
	status tinyint(1) NOT NULL,
	token varchar(50) NOT NULL,
	token_exptime int(10) NOT NULL
	)