const mysql = require('mysql2');
const inquirer = require('inquirer');
const db = require('./db/connection');




const commands = [
    {
        type: 'list',
        message: 'Please choose what you want to do',
        name: 'commands',
        choices: [
            'view all departments',
            'view all roles',
            'view all employees',
            'add a department',
            'add a role',
            'add an employee',
            'update an employee role',
        ]
    }
];

    
function options() {

    inquirer.prompt(commands)
        .then(answer => {
            if (answer.commands === 'view all departments') {
                viewAllDepartments();
            } else if (answer.commands === 'view all roles') {
                viewAllRoles();
            } else if (answer.commands === 'view all employees') {
                viewAllEmployees();
            } else if (answer.commands === 'add a department') {
                addADepartment();
            } else if (answer.commands === 'add a role') {
                addARole();
            } else if (answer.commands === 'add an employee') {
                addAnEmployee();
            } else if (answer.commands === 'update an employee role') {
                updateEmployeeRole();
            }
        })


};







function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        } 
        console.table(results);
    });
    restart();
};

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) {
            console.log(err);
        } 
        console.table(results);
    });
    restart();
};

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.log(err);
        } 
        console.table(results);
    });
    restart();
};

function addADepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'department_name'
        }
    ]).then((answer) => {
        
        db.query(
            `INSERT INTO department(department_name) VALUE (${JSON.stringify(answer.department_name)})`, function (err, results) {
                if ( err ) {
                    console.log(err)
                }
            }
        )
        console.log('The department has been addded into database');
        restart();
        
    })
    
};






function addARole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'role_name'
        },
        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'salary'
        },
        {
            type: 'input',
            message: 'What is the department_ID of the role?',
            name: 'role_departmentID'
        }
    ]).then((answer) => {
        
        db.query(
            `INSERT INTO role(title, salary, department_id) VALUE (${JSON.stringify(answer.role_name)}, ${JSON.stringify(answer.salary)}, ${JSON.stringify(answer.role_departmentID)})`, function (err, results) {
                if ( err ) {
                    console.log(err)
                }
            }
        )
        console.log('The role has been addded into database');
        restart();
        
    })
    
};


function addAnEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message: `What is the employee's first name?`,
            name: 'first_name'
        },
        {
            type: 'input',
            message: `What is the employee's last name?`,
            name: 'last_name'
        },
        {
            type: 'input',
            message: `What is the employee's role_id?`,
            name: 'newRole'
        },
        {
            type: 'input',
            message: `Who is the employee's manager_id?`,
            name: 'addManager'
        }
    ]).then((answer) => {
        
        db.query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (${JSON.stringify(answer.first_name)}, ${JSON.stringify(answer.last_name)}, ${JSON.stringify(answer.newRole)}, ${JSON.stringify(answer.addManager)})`, function (err, results) {
                if ( err ) {
                    console.log(err)
                }
            }
        )
        console.log('The employee has been addded into database');
        restart();
        
    })
    
};

function updateEmployeeRole() {
    db.query("SELECT first_name FROM employee", function (err, res) {
        var employeeList = [];
        for (var i = 0; i < res.length; i++) {
            employeeList.push(res[i].first_name)
        }
        inquirer.prompt([{
            name: "employeeList",
            type: "list",
            message: "Which employee's role do you want to update?",
            choices: employeeList,
        }, {
            name: "newrole",
            message: "Enter the new role_id for this employee."
        }]).then(function (answers) {
            db.query("UPDATE role SET ? WHERE?", [{
                role_id: (answers.newrole)
            }, {
                first_name: answers.employeeList
            }],
                function (err, res) {
                    console.log("Here is an update completed.")
                    restart();

                }
            )
        })
    })
};

function restart() {
    inquirer.prompt([{
        type: "list",
        name: "continue",
        choices: ["Yes", "No"],
        message: "Would you like to do more?\n"
    }]).then(function (answers) {
        if (answers.continue === "Yes") {
            options();
        } else {
            exit()
        }
    });
};

function exit() {
    console.log("Thank you for using employee tracker!")
    connection.end()
};


options();


