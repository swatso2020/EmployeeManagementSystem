var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Welcomenow12345",
  database: "empManSys"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employees",
        "Update Employee Roles",
        "Update Employee Manager",
        "View Employees by Manager",
        "Delete Departments",
        "Delete Roles",
        "Delete Employees",
        "View Department Budget",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Departments":
        departmentSearch();
        break;

      case "View Roles":
        roleSearch();
        break;

      case "View Employees by Manager":
        managerSearch();
        break;
      
      case "View Department Budget":
        budgetSearch();
        break;

      case "Add Department":
        departmentInsert();
        break;

      case "Add Role":
        roleInsert();
        break;

      case "Add Employee":
        employeeInsert();
        break;

      case "Update Employee Role":
        roleUpdate();
        break;

      case "Update Employee Manager":
        managerUpdate();
        break;

      case "Delete Department":
        departmentDelete();
        break;
  
      case "Delete Role":
        roleDelete();
        break;
  
      case "Delete Employee":
        employeeDelete();
        break;

      case "exit":
        connection.end();
        break;
      }
    });
}

function departmentSearch() {
      connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
          console.log("Here are all the departments");
          console.table(res)
        })
        runSearch();
      }


// function roleSearch() {
//   var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, function(err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].artist);
//     }
//     runSearch();
//   });
// }

// function rangeSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         if (err) throw err;
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }

// function songSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//         if (err) throw err;
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         runSearch();
//       });
//     });
// }
