// function for queries


// Import and require mysql2
const mysql = require('mysql2');


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'password',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

// Query database

