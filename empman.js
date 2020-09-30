const mysql = require("mysql");
const inquirer = require("inquirer");

//Connection to the database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Welcomenow12345",
  database: "empManSys"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

//Prompt user to see what they wantto do
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

      case "View Employees":
      employeeSearch();
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
//Add departments
function departmentInsert() {
  inquirer
    .prompt(
      {
      name: "newDepartment",
      type: "input",
      message: "Enter the department name?"
    })
    .then(function(answer) {
      connection.query("insert into department (name) values (?)", answer.newDepartment,function(err, res) {
        if (err) throw err;
        console.log(answer.newDepartment+" Created" );
                   
      })     
        runSearch();
      });
    
  }

  //Add roles
  function roleInsert() {
    inquirer
      .prompt({
        name: "newTitle",
        type: "input",
        message: "what is the title"
      },
      {
      name: "newSalary",
      type: "input",
      message: "what is the Salary"},
      {
        name: "newDepart",
        type: "input",
        message: "what is the Department Id"})
      .then(function(answer) {
        connection.query("insert into role (title,salary,department_id) value (?,?,?)", [answer.newTitle,answer.newSalary,answer.newDepart],function(err, res) {
          if (err) throw err;
          //console.log(answer.name+" Created" );
                     
        })     
          runSearch();
        });
      
    }

     //Add employees
  function employeeInsert() {
    inquirer
      .prompt([
        {
        name: "newFname",
        type: "input",
        message: "what is the First Name"
      },
      {
      name: "newLname",
      type: "input",
      message: "what is the Last Name"},
      {
        name: "newRoleId",
        type: "input",
        message: "what is the roleId"},
        {
          name: "newManagerId",
          type: "input",
          message: "what is the Manager Id"}
      ])
      .then(function(answer) {
        connection.query("insert into employee (first_name,last_name,role_id, manager_id) value (?,?,?,?)", [answer.newFname,answer.newLname,answer.newRoleId,answer.newManagerId],function(err, res) {
          if (err) throw err;
          //console.log(answer.name+" Created" );
                     
        })     
          runSearch();
        });
      
    }
  

//View all the departments in Database
function departmentSearch() {
      connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
          console.log("Here are all the departments");
           for (var i = 0; i < res.length; i++) {
                      console.table("Depart_ID: " + res[i].id + " | Name: " + res[i].name );
                   }
      })    
        runSearch();
      }



    

//View all the roles in Database
function roleSearch() {
  connection.query("SELECT id, title FROM role", function(err, res) {
    if (err) throw err;
      console.log("Here are all the roles");
       for (var i = 0; i < res.length; i++) {
                  console.table("Role_ID: " + res[i].id + " | Title: " + res[i].title );
               }
  })    
    runSearch();
  }

  //View all the employees in Database
function employeeSearch() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
      console.log("Here are all the roles");
       for (var i = 0; i < res.length; i++) {
                  console.table("employee_ID: " + res[i].id + " | f_name: " + res[i].first_name + " | l_name: " + res[i].last_name +" | Title: " + res[i].title  );
               }
  })    
    runSearch();
  }

  //View all the employees in Database
function employeeSearch() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
      console.log("Here are all the roles");
       for (var i = 0; i < res.length; i++) {
                  console.table("employee_ID: " + res[i].id + " | f_name: " + res[i].first_name + " | l_name: " + res[i].last_name +" | Title: " + res[i].title  );
               }
  })    
    runSearch();
  }


  //view employee by manager


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
