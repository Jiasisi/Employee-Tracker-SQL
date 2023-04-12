const mysql = require('mysql2');
const inquirer = require('inquirer');

const db = mysql.createConnection (
    {
        host: 'localhost',
        user: 'root',
        password: 'Ljs19951202',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
);


function options() {
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

    
    const userchoice = inquirer.prompt(commands);

    switch (userchoice.choice) {
        case "view all departments":
            viewAllDepartments();
            break;
        case "view all roles":
            viewAllRoles();
            break;
        case "view all employees":
            viewAllEmployees();
            break;
        case "add a department":

        break;
        case "add a role":

        break;
        case "add an employee":

        break;
        case "update an employee role":

        break;


    }


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
};

function viewAllEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) {
            console.log(err);
        } 
        console.table(results);
    });
};





