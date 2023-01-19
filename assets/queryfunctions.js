// function for queries
const cTable = require("console.table");

// Import and require mysql2
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "password",
    database: "employeeTracker_db",
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

// view employee information
function employeeTable() {
  db.query(
    `select employee.id,
     employee.first_name, 
     employee.last_name, 
     roleTable.title, 
     roletable.salary, 
     department.departmentname, 
     CONCAT(a.first_name, Space(1), a.last_name) as manager 
     from employee
  left join roleTable
  on employee.role_id = roleTable.id
  left join department
  on roleTable.department_id = department.id
  left join employee as a
  on employee.manager_id = a.id
  order by employee.id`,
    function (err, results) {
      const table = cTable.getTable(results);
      console.log(table);
    }
  );
}

//view all roles
function roleTable() {
  db.query(
    `SELECT roleTable.id, roleTable.title, 
    roleTable.salary, department.departmentname 
    FROM roleTable JOIN department on roleTable.department_id = department.id`,
    function (err, results) {
      const table = cTable.getTable(results);
      console.log(table);
    }
  );
}

//view all departments
function departmentTable() {
  db.query("SELECT * FROM department", function (err, results) {
    // console.Table(results);
    const table = cTable.getTable(results);
    console.log(table);
    if (err) {
      console.error(err);
    }
  });
}

//add a department
function addDepartment(additionalDeparment) {
  console.log(additionalDeparment);
  db.query(
    "INSERT INTO department SET ?",
    { departmentname: additionalDeparment },
    function (err, results) {
      if (err) {
        console.error(err);
      }
    }
  );
}

module.exports = { departmentTable, employeeTable, roleTable, addDepartment };
