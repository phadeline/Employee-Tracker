
const express = require('express');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001; //verifying if a port is provided for example heroku otherwise use port 3001
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection( //connects to the database (EmployeeTracker_db)
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeeTracker_db'  //database name that we will use 
  },
  console.log(`Connected to the classlist_db database.`)
);




app.use((req, res) => { //send a 404 error for every method request because no routes are provided
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
