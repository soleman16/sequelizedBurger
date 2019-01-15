DROP DATABASE IF EXISTS burgers_db;
CREATE DATABASE burgers_db;

create table burgers_db.burgers(
	id int auto_increment primary key,
    burger_name varchar(50),
    devoured boolean
);