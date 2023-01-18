DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  departmentname VARCHAR(30) NOT NULL
);

CREATE TABLE roleTable (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id)
    references department(id)
);  


CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT references employee,
    FOREIGN KEY(role_id)
    REFERENCES roleTable(id)
)