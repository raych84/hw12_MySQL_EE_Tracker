var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "8675309rW",
  database: "employees"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {
  inquirer
    .prompt([{
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add New Department(s)",
        "Add New Role(s)",
        "Add New Employee(s)",
		"View Department(s)",
		"View Role(s)",
		"View Employee(s)",
		"Update Employee Role(s)",
        "exit"
      ]
	}])
    .then(function(answer) {
      switch (answer.action) {
      case "Add departmets":
        addDepts();
        break;

      case "Add Roles":
        addRoles();
        break;

      case "Add Employees":
        addEe();
        break;

      case "View Departments":
        viewDepts();
		break;
		
      case "View Roles":
        viewRoles();
		break;
		
      case "View Employees":
        viewEe();
		break;
		
      case "Update Employee Roles":
        updateEERoles();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}
function addDepts() {
	inquirer
	.prompt (
		{
			name: "department",
			type: "input",
			message: "What new Department would you like to add?"
		})
		.then(function(answer){
			connection.query(
				"INSERT INTO department SET?",
				{
				name: answer.department
				},
				function(err) {
					if(err) throw err;
					console.log("New Department was added successfully!");
					start();
				}
			)
		})
	
	}
	function addRoles() {
		inquirer
		.prompt ([
			{
				name: "role",
				type: "input",
				message: "What new role(s) would you like to add?"
			},
		])
			.then(function(answer){
				connection.query(
					"INSERT INTO role SET ?",
					{
						id: answer.id,
						title: answer.title,
						salary: answer.salary,
						department_id: answer.department_id
					},
					function(err) {
						if(err) throw err;
						console.log("New Role was added successfully!");
						start();
					}
				)
			})
		
		}
		

function addEe() {
inquirer
.prompt ([
	{
		name: "Employee Name",
		type: "input",
		message: "What is the name of your new employee?"
	},
])
	.then(function(answer){
		connection.query(
			"INSERT INTO employee SET?",
			{
				first_name:answer.first_name,
				last_name: answer.last_name,
				id: answer.id,
				role_id: answer.role_id,
				manager_id: answer.manager_id
			},
			function(err) {
				if(err) throw err;
				console.log("New Employee was added successfully!");
				start();
			}
		)
	})

}
function viewDepts() {
	inquirer
	  .prompt({
		name: "department",
		type: "input",
		message: "Which department did you want to search for?"
	  })
	  .then(function(answer) {
		var query = "SELECT name, id FROM department WHERE ?";
		connection.query(query, { name: answer.department }, function(err, res) {
		  if (err) throw err;
		  for (var i = 0; i < res.length; i++) 
		  runSearch();
		});
	  });
  }
function viewRoles() {
	inquirer
	  .prompt({
		name: "role",
		type: "input",
		message: "Which role did you want to search for?"
	  })
	  .then(function(answer) {
		var query = "SELECT id, title, department_id, salary FROM role WHERE ?";
		connection.query(query, { name: answer.role }, function(err, res) {
		  if (err) throw err;
		  for (var i = 0; i < res.length; i++) 
		  runSearch();
		});
	  });
  }
function viewEe() {
	inquirer
	  .prompt({
		name: "employee",
		type: "input",
		message: "What employee did you want to search for?"
	  })
	  .then(function(answer) {
		var query = "SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ?";
		connection.query(query, { name: answer.employee }, function(err, res) {
		  if (err) throw err;
		  for (var i = 0; i < res.length; i++) 
		  runSearch();
		});
	  });
  }
function updateEERoles() {
	inquirer
	  .prompt({
		name: "roles",
		type: "input",
		message: "Which employee(s) role did you  need to update?"
	  })
	  let mysql = require('mysql');
let config = require('./config.js');

let connection = mysql.createConnection(config);

// update statment
let sql = `UPDATE employee
           SET completed = ?
           WHERE id = ?`;

let data = [false, 1];

// execute the UPDATE statement
connection.query(sql, data, (error, results, fields) => {
  if (error){
    return console.error(error.message);
  }
  console.log('Rows affected:', results.affectedRows);
});

connection.end();
  }