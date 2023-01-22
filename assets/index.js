const inquirer = require("inquirer");
const {
  departmentTable,
  employeeTable,
  roleTable,
  addDepartment,
  addRole,
  departmentoptions,
} = require("./queryfunctions");




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
          break;
        case "view all roles":
          roleTable();
          break;
        case "view all employees":
          employeeTable();
          break;
        case "add a department":
          newDepartment();
          break;
        case "add a role":
          newRole();
          break;
        case "add an employee":
          newDepartment();
          break;
        case "update an employee role":
          newDepartment();
          break;
      }
    });
}

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
      departmentTable();
    });
}

function newRole() {
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
        choices: departmentoptions(),
      },
    ])
    .then((response) => {
      const addNewTitle = response.title;
      const addNewSalary = parseInt(response.salary);
      const departmentRole = response.chooseOptions;
      addRole(addNewTitle, addNewSalary, departmentRole);
    });
}

module.exports = allOptions;
