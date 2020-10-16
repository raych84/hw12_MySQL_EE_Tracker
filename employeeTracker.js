var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

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
				case "Add New Department(s)":
					addDepts();
					break;

				case "Add New Role(s)":
					addRoles();
					break;

				case "Add New Employee(s)":
					addEe();
					break;

				case "View Department(s)":
					viewDepts();
					break;

				case "View Role(s)":
					viewRoles();
					break;

				case "View Employee(s)":
					viewEe();
					break;

				case "Update Employee Role(s)":
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
				name: "title",
				type: "input",
				message: "What new role(s) would you like to add?"
			},
			{
				name: "salary",
				type: "number",
				message: "What is the salary amount for this role?"
			},
			{
				name: "department_id",
				type: "number",
				message: "Please provide the Department ID correlated to this role."
			}
		])
		.then(function (answer) {
			connection.query(
				"INSERT INTO role SET ?",
				{
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
				name: "role_id",
				type: "number",
				message: "Please provide role ID your new employee?"
			},

		])
		.then(function (answer) {
			connection.query("INSERT INTO employee SET ?",
				{
					first_name: answer.first_name,
					last_name: answer.last_name,
					role_id: answer.role_id

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
	
	var query = "SELECT * FROM department ";
	connection.query(query, function (err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.table("Department: " + res[i].name + " || ID: " + res[i].id );
		}
		start();
	});
};

function viewRoles() {

	var query = "SELECT * FROM role ";
	connection.query(query, function (err, res) {
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.table("Role: " + res[i].title +  "|| ID: " + res[i].id +  "|| Department ID: " + res[i].department_id);
		}
		start();
	});
};

function viewEe() {
	var query = "SELECT * FROM employee ";
connection.query(query, function (err, res) {
	if (err) throw err;
	for (var i = 0; i < res.length; i++) {
		console.table("Name: " + res[i].first_name +  res[i].last_name + " || ID: "  + res[i].id +  "|| Role ID: " + res[i].role_id);
	}
	start();
});
};

	
function updateEERoles() {
	inquirer
		.prompt([{
			name: "title",
			type: "input",
			message: "Which employee role did you need to update?"
		},
		{
			name: "salary",
			type: "input",
			message: "What is the new salary?"
		}
		])
		.then(function(answer) {
			// when finished prompting, insert a new item into the db with that info
			connection.query(
			  "UPDATE role SET  ?",
			  {
				title: answer.title,
				salary: answer.salary
			  },
			  function(err) {
				if (err) throw err;
				console.log("Your update was completed successfully!");
			
				start();
			  }
			);
		  });
	  }