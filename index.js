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
                updateEmployee();
            }
        })


};


options();





function viewAllDepartments() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) {
            console.log(err);
        } 
        console.table(results);
    });
    options();
};

function viewAllRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) {
            console.log(err);
        } 
        console.table(results);
    });
    options();
};

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.log(err);
        } 
        console.table(results);
    });
    options();
};

function addADepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'department_name'
        }
    ]).then(function(results) {
        db.query(
            'INSERT INTO department SET ?',
            ({
                department_name: results.department,
            }),
            function (err, results) {
                if ( err ) return reject( err );
            }
        )
        console.table(results);
        options();
        
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
            message: 'What is the department of the role?',
            name: 'role_department'
        }
    ]).then(function(results) {
        db.query('INSERT INTO role'
        )
        console.tablee(results);
        options();
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
            message: `What is the employee's role?`,
            name: 'newRole'
        },
        {
            type: 'input',
            message: `Who is the employee's manager?`,
            name: 'addManager'
        }
    ]).then(function(results) {
        db.query('INSERT INTO role'
        )
        console.tablee(results);
        options();
    })
};

function updateEmployee() {



};



