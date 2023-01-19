const inquirer = require("inquirer");
const {
  departmentTable,
  employeeTable,
  roleTable,
  addDepartment,
} = require("./queryfunctions");

//do the inquirer promts here

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

module.exports = allOptions;
