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

connection.connect(function (err) {
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
		.then(function (answer) {
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
		.prompt(
			{
				name: "department",
				type: "input",
				message: "What new Department would you like to add?"
			})
		.then(function (answer) {
			connection.query(
				"INSERT INTO department SET?",
				{
					name: answer.department
				},
				function (err) {
					if (err) throw err;
					console.log("New Department was added successfully!");
					start();
				}
			)
		})

}
function addRoles() {
	inquirer
		.prompt([
			{
				name: "role",
				type: "input",
				message: "What new role(s) would you like to add?"
			},
		])
		.then(function (answer) {
			connection.query(
				"INSERT INTO role SET ?",
				{
					id: answer.id,
					title: answer.title,
					salary: answer.salary,
					department_id: answer.department_id
				},
				function (err) {
					if (err) throw err;
					console.log("New Role was added successfully!");
					start();
				}
			)
		})

}

function addEe() {
	inquirer
		.prompt([
			{
				name: "first_name",
				type: "input",
				message: "What is the first name of your new employee?"
			},
			{
				name: "last_name",
				type: "input",
				message: "What is the last name of your new employee?"
			},
			{
				name: "id",
				type: "number",
				message: "What is your new employee's id number?"
			},
			{
				name: "role_id",
				type: "number",
				message: "What is the role id of the new employee?"
			},
			{
				name: "manager_id",
				type: "number",
				message: "What is the manager id number of your new employee?"
			}
		])
		.then(function (answer) {
			connection.query(
				"INSERT INTO employee SET?",
				{
					first_name: answer.first_name,
					last_name: answer.last_name,
					id: answer.id,
					role_id: answer.role_id,
					manager_id: answer.manager_id
				},
				function (err) {
					if (err) throw err;
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
			message: "What department are you looking for?"

		})

		.then(function (answer) {
			var query = "SELECT name, id FROM department WHERE ?";
			connection.query(query, { name: answer.department }, function (err, res) {
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
		.then(function (answer) {
			var query = "SELECT id, title, department_id, salary FROM role WHERE ?";
			connection.query(query, { name: answer.role }, function (err, res) {
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
		.then(function (answer) {
			var query = "SELECT first_name, last_name, role_id, manager_id FROM employee WHERE ?";
			connection.query(query, { name: answer.employee }, function (err, res) {
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
			message: "Which employee(s) role did you need to update?"
		})
	connection.query('UPDATE employee SET id = ?, first_name = ?, last_name = ?, role_id = ?, manager_id = ?, WHERE id = ?'), ['a', 'b', 'c', userId], function (error, results, fields) {
		if (error) throw error
	}
}