const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
    host: '',
    user: 'root',
    password: 'Toby1212!',
    database: 'departments_db'
});

// Connect to the database
db.connect(err => {
    if (err) throw err;
    console.log('Connected to the database');
});

// Function to query and display all departments
function viewAllDepartments() {
    const query = 'SELECT id, department_name FROM departments';
    db.query(query, (err, results) => {
        if (err) throw err;

        console.log('\All Departments:');
        console.log('-----------------');
        results.forEach(department => {
            console.log(`ID: ${department.id} | Name: ${department.department_name}`);
        });

        db.end(); // Close the database connection
    });
}

module.exports = {
    viewAllDepartments
};
