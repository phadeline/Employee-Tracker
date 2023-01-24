[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

# Employee-Tracker

## Description

The purpose of this project is to create an application that allows the user to keep track of information about the employees in a company. Information such as adding new departments, new employees, new roles as well as adding salaries, position titles and the manager an employee reports to. This app using MySQL to as a database to store employee information.  

## Table of Contents

- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Tests](#tests)
- [License](#license)

## **User Story**

- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
- SO THAT I can organize and plan my business

## **Acceptance Criteria**

- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Tech Stack

- Node.js
- Javascript
- Express.js
- HTML
- CSS
- MySQL

## Installation

In order to use this employee tracker, the user will have to enter "npm i" in their terminal in order to install the necessary packages. The user is expected to have MySQL installed as well. 

## Usage
 
- Video of the web app: 
[employee tracker](https://user-images.githubusercontent.com/112015433/214362037-9dea97e4-ff1b-4254-a78a-a5b46d5cd5a9.webm)


## Tests

No tests were required for this application.

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


