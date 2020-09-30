DROP DATABASE IF EXISTS empManSys;
CREATE database empManSys;

USE empManSys;

CREATE TABLE employee (
    id INT,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,
    manager_id int
);

CREATE TABLE role (
    id INT,
    title varchar(30),
    salary decimal,
    department_id int
  
);

CREATE TABLE department(
    id INT,
    title varchar(30),
    salary decimal,
    department_id int
  
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;