CREATE TABLE IF NOT EXISTS 'users'(
	id int(10) NOT NULL AUTO_INCREMENT,
	uesrname varchar(20) NOT NULL PRIMARY KEY,
	email varchar(50) NOT NULL UNIQUE,
	password varchar(20) NOT NULL,
	phone varchar(20) NOT NULL,
	status tinyint(1) NOT NULL,
	token varchar(50) NOT NULL,
	token_exptime int(10) NOT NULL,
)ENGINE=INNODB  DEFAULT CHARSET=utf8;
