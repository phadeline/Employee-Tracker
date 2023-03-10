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
      console.log("\n")
    console.log(table);
    console.log("\n")
      if (err) {
        console.error(err);
      }
    }
  );
}

//view all roles table joined with department Table
function roleTable() {
  db.query(
    `SELECT roleTable.id, roleTable.title,
    roleTable.salary, department.departmentname
    FROM roleTable JOIN department on roleTable.department_id = department.id`,
    function (err, results) {
      const table = cTable.getTable(results);
      console.log("\n")
    console.log(table);
    console.log("\n")
      if (err) {
        console.error(err);
      }
    }
  );
}

// //view all departments
function departmentTable() {
  db.query("SELECT * FROM department", function (err, results) {
    // console.Table(results);
    const table = cTable.getTable(results);
    console.log("\n")
    console.log(table);
    console.log("\n")
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
  db.query("SELECT * FROM department", function (err, results) {
    // console.Table(results);
    const table = cTable.getTable(results);
    console.log("\n")
    console.log(table);
    if (err) {
      console.error(err);
    }
  });
}

// add a new role to roleTable
function addRole(addNewTitle, addNewSalary, departmentRole) {
  console.log(addNewTitle, addNewSalary, departmentRole);

  //new row is added to roleTable
  db.query("INSERT INTO roleTable SET ?", {
    title: addNewTitle,
    salary: addNewSalary,
    department_id: departmentRole,
  });

  //displays the roleTable
  db.query(`SELECT * FROM roleTable`, function (err, results) {
    const table = cTable.getTable(results);
    console.log("\n")
    console.log(table);
    if (err) {
      console.error(err);
    }
  })
}

//adds new employee to the table
function addEmployee(newfirstname, newlastname, addtitle, addmanager) {
  db.query("INSERT INTO employee SET ?", {
    first_name: newfirstname,
    last_name: newlastname,
    role_id: addtitle,
    manager_id: addmanager,
  });

  //displays employee table
  db.query(`SELECT * FROM employee`, function (err, results) {
    const table = cTable.getTable(results);
    console.log("\n")
    console.log(table);
    if (err) {
      console.error(err);
    }
  });
}

//updates employee information
function employeeUpdate(idofemployee, employeenewrole) {
  db.query(`UPDATE employee set role_id = ? WHERE id = ?`, [
    employeenewrole,
    idofemployee,
  ]);

  //joins roleTable and employee table and displays the result
  db.query(
    `SELECT CONCAT(employee.first_name, Space(1), employee.last_name) as employee,
  employee.id as employeeid, roleTable.id as roleid, roleTable.title as title
  FROM employee 
  left join roleTable on roleTable.id = employee.role_id;`,
    function (err, results) {
      console.log("\n")
      const table = cTable.getTable(results);
      console.log(table);
      if (err) {
        console.error(err);
      }
    }
  );
}

module.exports = {
  departmentTable,
  employeeTable,
  roleTable,
  addDepartment,
  addRole,
  addEmployee,
  employeeUpdate,
};
