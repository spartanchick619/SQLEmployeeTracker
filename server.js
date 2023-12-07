//require dependencies
const inquirer =require ("inquirer");
const mysql =require("mysql12");
//database connection
const db = mysql.createConnection(
  {
    host: "localhost",
    port: "3001"
    user: "root",
    password: ""
    database: "employee_db"
  },
  console.log("Connected to employee_db.")
);

//connect to the db
db.connect((err) => {
  if (err) throw err;
  console.log ("Employee Tracker");
  mainMenu();
});
//main inquirer prompt
function mainMenu() {
  inquirer 
    .prompt ({
      type: "list",
      name: "mainMenu",
      message: "Please select from the following",
      choices: [
        "View all departments",
        "View all roles",
        "Add a department",
        "Add an employee",
        "Update an employee role",
        "Quit"
      ]
    })
    .then (({ mainMenu }) => {
      switch (mainMenu){
          case "View all departments": 
            viewAllDepartments();
            break;

          case "View all roles":
            viewAllRoles();
            break;

          case "Add a department":
            addDepartment();
            break;
            
          case "Update an employee role":
            updateEmployeeRole();
            break;

          case "Quit":
            db.end();
            break;
    }
  });
};

//view all departments function
function viewAllDepartments (){
  const query = "SELECT * FROM departments";
  connection.query (query, (err, res) => {
    if (err) {
      res.status(400).json({error:err.message});
      return;
    }
    console.table(res);
    mainMenu();
  })
};
//fucnrtion view all roles
function viewAllRoles(){
  const query = "SELECT roles.title, rolesd.id, department.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      mainMenu();
  })
};