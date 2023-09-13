const db = require('./config/connection');
const inquirer = require('inquirer')

let employeeResults;
let roleResults;

const getEmployeeData = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM employees';
        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const getRoleData = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM roles';
        db.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

Promise.all([getEmployeeData(), getRoleData()])
    .then(([employees, roles]) => {
        employeeResults = employees;
        roleResults = roles;
    })
    .catch((err) => {
        console.error('Error fetching data:', err);
    });


const start = () => {
    return inquirer.prompt({
        type: "list",
        name: "userChoice",
        message: "what would you like to do?",
        choices: [
            "view all departments",
            "view all roles",
            "view all employees",
            "add departments",
            "add roles",
            "add employees",
            "update employee role",
            "quit"
        ]
    })
        .then((answers) => {
            console.log(answers.userChoice)
            if (answers.userChoice === "view all departments") {
                viewAllDepartments()
            }
            if (answers.userChoice === "view all roles") {
                viewAllRoles()

            }
            if (answers.userChoice === "view all employees") {
                viewAllEmployees()

            }
            if (answers.userChoice === "add departments") {
                addDepartment();
            }
            if (answers.userChoice === "add roles") {
                addRole();
            }
            if (answers.userChoice === "add employees") {
                addEmployee();
            }
            if (answers.userChoice === "quit") {
                process.exit();
            }
            if (answers.userChoice === "update employee role") {
                updateEmployeeRole(employeeResults, roleResults);
                return;
            }
        });
};

start()

const viewAllDepartments = () => {
    const sql = "select * from departments"
    db.query(sql, (err, results) => {
        console.table(results)
    });
}

const viewAllRoles = () => {
    const sql = "select * from roles"
    db.query(sql, (err, results) => {
        console.table(results)
    });
}

const viewAllEmployees = () => {
    const sql = "select * from employees"
    db.query(sql, (err, results) => {
        console.table(results)
    });
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "departmentName",
                message: "Enter the department name",
            },
        ])
        .then((answers) => {
            const sql = "INSERT INTO departments (department_name) VALUES (?)";
            db.query(sql, [answers.departmentName], (err, results) => {
                if (err) throw err;
                console.log("Department added successfully");
            });
        });
}
const addRole = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "Enter the role name",
            },
            {
                type: "number",
                name: "roleSalary",
                message: "Enter the role salary:",
            },
            {
                type: "number",
                name: "departmentId",
                message: "Enter the department ID for this role",
            },
        ])
        .then((answers) => {
            const sql = "INSERT INTO roles (role_title, salary, department_id) VALUES (?, ?, ?)";
            db.query(sql, [answers.roleTitle, answers.roleSalary, answers.departmentId], (err, results) => {
                if (err) throw err;
                console.log("Role added successfully");
            });
        });
}
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "employeeFirstName",
                message: "Enter the employees first name",
            },
            {
                type: "input",
                name: "employeeLastName",
                message: "Enter the employees last name",
            },
            {
                type: "number",
                name: "roleId",
                message: "Enter the role ID for this employee",
            },
            {
                type: "number",
                name: "managerId",
                message: "Enter the manager Id for this employee",

            },
        ])
        .then((answers) => {
            const sql = "INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)";
            db.query(sql, [answers.employeeFirstName, answers.employeeLastName, answers.roleId], (err, results) => {
                if (err) throw err;
                console.log("Employee added successfully");
            });
        });
}

const updateEmployeeRole = (employeeResults, roleResults) => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Select the employee you want to update",
                choices: employeeResults.map(employee => ({
                    name: employee.employee_name,
                    value: employee.id
                })),
            },
            {
                type: "list",
                name: "newRoleId",
                message: "Select the new role for the employee:",
                choices: roleResults.map(role => ({
                    name: role.title,
                    value: role.id
                })),
            },
        ])
        .then((roleAnswers) => {
            const sql = "UPDATE employees SET role_id = ? WHERE id = ?";
            db.query(sql, [roleAnswers.newRoleId, roleAnswers.employeeId], (err, results) => {
                if (err) throw err;
                console.log("Employee role updated successfully")
            });
        });
}