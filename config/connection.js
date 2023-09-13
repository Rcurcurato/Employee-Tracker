const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'Toby1212!',
      database: 'departments_db'
    },
    console.log(`Connected to the departments_db database.`)
  );

  module.exports = db