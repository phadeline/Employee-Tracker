USE employeeTracker_db;

select employee.id, employee.first_name, employee.last_name, roleTable.title, roletable.salary, department.departmentname, employee.manager_id
from employee
left join roleTable
on employee.role_id = roleTable.id
left join department
on roleTable.department_id = department.id;
