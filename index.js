const inquirer = require("inquirer");
const {
  departmentTable,
  employeeTable,
  roleTable,
  addDepartment,
  addRole,
  addEmployee,
  employeeUpdate,
} = require("./assets/queryfunctions");

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

//This function gives the user the options
function allOptions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "chooseOptions",
        choices: [
          "View all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((responses) => {
      switch (responses.chooseOptions) {
        case "View all departments":
          departmentTable();
          allOptions();
          break;
        case "view all roles":
          roleTable();
          allOptions();
          break;
        case "view all employees":
          employeeTable();
          allOptions();
          break;
        case "add a department":
          newDepartment();
          break;
        case "add a role":
          newRole();
          break;
        case "add an employee":
          newEmployee();
          break;
        case "update an employee role":
          updateEmployee();
          break;
      }
    });
}

//this function adds a department
function newDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "what is the name of the new department?",
      },
    ])
    .then((response) => {
      const additionalDeparment = response.department;
      addDepartment(additionalDeparment);
      console.log(`New Department ${response.department} has been added!`);
      departmentTable();
      allOptions();
    });
}

//this function adds a new role
function newRole() {
  db.query("SELECT * FROM department", function (err, results) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "what is the title of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "what is the salary of the new role?",
        },
        {
          type: "list",
          name: "chooseOptions",
          message: "What department is this role for?",
          choices: results.map((result) => {
            return { name: result.departmentname, value: result.id };
          }),
        },
      ])
      .then((response) => {
        const addNewTitle = response.title;
        const addNewSalary = parseInt(response.salary);
        const departmentRole = response.chooseOptions;
        console.log(
          `new role: ${response.title} as been added to the database!`
        );
        addRole(addNewTitle, addNewSalary, departmentRole);
        allOptions();
      });
  });
}

//this function adds a new employee
function newEmployee() {
  db.query(
    `SELECT CONCAT(employee.first_name, Space(1), employee.last_name) as manager,
    employee.id as managerid, roleTable.id as roleid, roleTable.title as title
    FROM employee 
    left join roleTable on roleTable.id = employee.role_id
    left join employee as a on employee.manager_id = a.id`,

    function (err, results) {
      if (err) {
        console.log(err);
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstname",
            message: "what is the employee's first name ?",
          },
          {
            type: "input",
            name: "lastname",
            message: "what is the employee's last name?",
          },
          {
            type: "list",
            name: "title",
            message: "What is the employee's role?",
            choices: results.map((result) => {
              return { name: result.title, value: result.roleid };
            }),
          },
          {
            type: "list",
            name: "manager",
            message: "Who is the employee' manager?",
            choices: results.map((result) => {
              return { name: result.manager, value: result.managerid };
            }),
          },
        ])
        .then((response) => {
          const newfirstname = response.firstname;
          const newlastname = response.lastname;
          const addtitle = response.title;
          const addmanager = response.manager;
          console.log(
            `new employe: ${response.firstname} ${response.lastname} has been added!`
          );
          addEmployee(newfirstname, newlastname, addtitle, addmanager);
          allOptions();
        });
    }
  );
}

//this function updates employee information
function updateEmployee() {
  db.query(
    `SELECT CONCAT(employee.first_name, Space(1), employee.last_name) as employeename,
  employee.id as employeeid, roleTable.id as roleid, roleTable.title as title
  FROM employee 
  left join roleTable on roleTable.id = employee.role_id;`,
    function (err, results) {
      if (err) {
        console.log(err);
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeename",
            message: "which employee would you like to update ?",
            choices: results.map((result) => {
              return { name: result.employeename, value: result.employeeid };
            }),
          },
          {
            type: "list",
            name: "employeerole",
            message: "what is the employee's new role?",
            choices: results.map((result) => {
              return { name: result.title, value: result.roleid };
            }),
          },
        ])
        .then((response) => {
          const idofemployee = response.employeename;
          const employeenewrole = response.employeerole;
          console.log(`employee information has been updated!`);
          employeeUpdate(idofemployee, employeenewrole);
          allOptions();
        });
    }
  );
}

allOptions();

module.exports = { allOptions };
