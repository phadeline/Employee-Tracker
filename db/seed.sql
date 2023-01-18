Insert into department (departmentname)
values
("Sales"),
("Marketing"),
("Accounting"),
("Research"),
("Information Technology");


Insert into roleTable (title, salary, department_id)
values
("Chief Marketing Officer", 90000, 2),
("Chief Financial Officer", 120000, 3),
("Marketing Manager", 85000, 2),
("Sales Manager", 80000, 1),
("Sales Representative", 80000, 1),
("Junior Software Engineer", 75000, 5);

Insert into employee (first_name, last_name, role_id, manager_id)
values
("David", "Dubrick", 1, NULL),
("John", "Connor", 2, NULL),
("Mary", "Johnson", 3, 1),
("Julia", "Hommer", 4, NULL),
("Xavier", "White", 5, 4),
("Phay", "Evra", 6, NULL);