const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const Choices = require("inquirer/lib/objects/choices");

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
        "View Department",
        "View Department Budget",
        "View Roles",
        "View Employees",
        "View Employees by Manager",
        "Update Employee Roles",
        "Update Employee Manager",
        "Delete Department",
        "Delete Roles",
        "Delete Employee",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Department":
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
      connection.query("SELECT id as Department_ID, name Department_Name FROM department", function(err, res) {
        if (err) throw err;
          console.log("Here are all the departments");
                      console.table(res);  
                      runSearch();
                                 
      })    
     
      }



    

//View all the roles in Database
function roleSearch() {
  connection.query("SELECT id as Role_ID, title as Role_Name FROM role", function(err, res) {
    if (err) throw err;
      console.log("Here are all the roles");
      
                  console.table(res);
                  runSearch();
               
  })    
   
  }

  //View all the employees in Database
function employeeSearch() {
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;
      console.log("Here are all the roles");
     
                  console.table(res);
                  runSearch();
               
  })    
    
  }




  //view employee by manager
  function managerSearch() {
    inquirer
      .prompt([
        {
        name: "ManagerS",
        type: "list",
        message: "Which managers team would you like to see?",
        choices: [
          "Jim Beam",
          "Sonny Lister",
          "Mildred Racthed"
        ]
        }
      ])
      .then(function(answer) {
        query = "select concat(last_name,', ',first_name) as Employee_Name, Title, format(Salary, 0) as Salary, name as Department_Name from employee join role on employee.role_id = role.id join Department on role.department_id = department.id"
        connection.query(query, answer.ManagerS,function(err, res) {
          if (err) throw err;
         
          console.table(res)
          runSearch();
                   
        })     
          
        });
      
    }





 
  //View Department Budget
  function budgetSearch() {
    inquirer
      .prompt([
        {
        name: "BudgetS",
        type: "list",
        message: "What Department Budget would you like to see",
        choices: [
          "Finance",
          "Information Technology",
          "Marketing",
          "Facilities",
          "Accounting",
          "Treasury",
          "Sourcing",
          "Real Estate",
          "Innovation",
          "Sourcing"
        ]
        }
      ])
      .then(function(answer) {
        query = "select name as Department_Name, format(sum(salary),0) as Total_Department_Salary from employee join role on employee.role_id = role.id join Department on role.department_id = department.id where  name = ?"
        connection.query(query, answer.BudgetS,function(err, res) {
          if (err) throw err;
         
          console.table(res)
          runSearch();
                   
        })     
          
        });
      
    }


 


  

  //Delete Departments
  function departmentDelete() {
    connection.query("SELECT * FROM department", function(err, res) {
      if (err) throw err;
        console.log("Here are all the departments");
                    console.table(res); })
    inquirer
      .prompt(
        {
        name: "departmentD",
        type: "input",
        message: "What is the id of the department you want to delete?"
      })
      .then(function(answer) {
        connection.query("delete from department where (?)", answer.departmentD,function(err, res) {
          if (err) throw err;
          console.log("Department #"+answer.departmentD+" Has been deleted" );
  
                     
        })     
        runSearch(); 
    })
  }

//Delete Employeee
  function employeeDelete() {
    inquirer
    .prompt(
      {
      name: "employeeD",
      type: "input",
      message: "What is the id of the employee you want to delete?"
    })
    .then(function(answer) {
      connection.query("delete from employee where (?)", employeeD.departmentD,function(err, res) {
        if (err) throw err;
        console.log(answer.employeeD+" Has been delete" );
      })
                   
      })     
      runSearch(); 
  }




//Update Manager
  function managerUpdate() {


    inquirer
    .prompt(
      {
      name: "employeeU",
      message: "What is the id of the employee whos manager you want to Update?",
      choices:[]
    },
    {
    name: "managerU",
    message: "What is the id of the new manager?",
    choices:[]
  }
    )
    .then(function(answer) {
      query = "UPDATE employee SET  manager_id =  Where id = "
      connection.query("SELECT * FROM employee",answer.managerU, answer.employeeU, function(err, res) {
        if (err) throw err;
        //I would want the actual record displayed here.
          console.log("Employee Manager has been updated");
          runSearch(); 
                   
      })
                   
      })     
     
  
  
  }


  //Update Manager
  function roleUpdate() {
    employeeSearch()
    inquirer
    .prompt(
      {
      name: "employeeU",
      message: "What is the id of the employee whos role you want to Update?",
     
    },
    {
    name: "roleU",
    message: "What is the id of the new role?",
    
  }
    )
    .then(function(answer) {
      query = "UPDATE employee SET  role_id =  Where id = "
      connection.query("SELECT * FROM employee",answer.roleU, answer.employeeU, function(err, res) {
        if (err) throw err;
          console.log("Employee Role has been updated");
                   
      })
                   
      })     
      runSearch(); 
  
  
  }