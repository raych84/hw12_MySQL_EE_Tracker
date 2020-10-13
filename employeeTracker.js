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
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add departments",
        "Add Roles",
        "Add Employees",
		"View Departments",
		"View Roles",
		"View Employees",
		"Update Employee Roles",
        "exit"
      ]
	})

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
	.prompt ([
		{
			name: "Department",
			type: "input",
			message: "What new Department would you like to add?"
		},
	])
		.then(function(answer){
			connection.query(
				"ADD NEW DEPARTMENT?",
				{
					id: answer.id,
					name: answer.name
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
				name: "Role",
				type: "input",
				message: "What new role would you like to add?"
			},
		])
			.then(function(answer){
				connection.query(
					"ADD NEW ROLE?",
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
			"ADD NEW EMPLOYEE?",
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
	