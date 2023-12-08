//require dependencies
const { connect } = require("http2");
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
  const query = "SELECT roles.title, roles.id, department.department_name, roles.salary from roles join departments on roles.department_id = departments.id";
  connection.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
      mainMenu();
  })
};
//function to viewl all employees
function viewAllEmployees () {
  const query = `
  SELECT employee.id, employee.first_name,employee.last_name, roles.title AS role, department.department_name, roles.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
  FROM employee 
  LEFT JOIN roles on (role_id = updateEmployeeRole.id)
  LEFT JOIN department  on (.department_id = role.department.id)
  LEFT JOIN employee manager on manager.id = employee.manager.id;
  ORDER BY employee.id;
  `;
  connection.query(query, (err, res) => {
    if (err) {
      res.status(400).json({error:err.message});
      return;
    }
    console.table(res);
    mainMenu();
}
//function to add a department
function addDepartment () {
    inquirer
      .prompt({
            type: "input",
            name: "name",
            message: "Enter the name of the new department:",
        })
        .then ((answer) => {
            console.log(answer.name);
            const query = `INSERT INTO department name`;
            connection.query(query, (err, res) => {
              if (err) throw err;
              console.log("Successfully added" , departmentName);
              mainMenu;
            });
    });
}
//fucntion to add a role
function addRole () {
  const query ="SELECT * FROM departments";
  connection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Enter title of new role:",
          },
          {
            type: "list",
            name: "salary",
            message: "Enter salary of new role:",
            choices: res.map(
                (department) => department.name === answers.department
              ),
          },
        ])
        .then((answers) => {
          const department = res.find(
            (department) => department.name === answers.deaprtment
          );
          const query = "INSERT INTO roles SET";
          connection.query(
            query,
            {
              title: answers.title,
              salary: answers.salary,
              department_id: department,
            },
            (err, res) => {
              if (err) throw err;
              console.log("Added role with salary");
              mainMenu();
            });
          });
        };
//function to add employee 
function addEmployee () {
  connection.query("SELECT id, title FROM roles", (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    const roles = results.map(({ id, title}) => ({
      name: title, 
      value: id,
    });
  };
};
//prompt user for employee info
inquirer
    .prompt ([
      {
        type: "imput",
        name: "firstName",
        message: "Enter emplpyee's first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter emplpyee's last name:",
      },
      {
        type: "list";
        name: "roleId",
        message: "Select employee role:",
        choices: roles,
      },
      {
        type: "list",
        name: "managerId",
        message: "Select the employee manager:",
        choices: [
          { name: "None, value: null"},
          ...managers,
        ],
      },
    ])
    .then ((answers) => {
      const sql =  "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      const values = [
        answers.firstName,
                            answers.lastName,
                            answers.roleId,
                            answers.managerId,
                        ];
                        connection.query(sql, values, (error) => {
                            if (error) {
                                console.error(error);
                                return;
                            }

                            console.log("Employee added successfully");
                            start();
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        );
    });
}
//function to add manager
function addManager() {
  const queryDepartments = "SELECT * FROM departments";
  const queryEmployees = "SELECT * FROM employee";

  connection.query(queryDepartments, (err, resDepartments) => {
      if (err) throw err;
      connection.query(queryEmployees, (err, resEmployees) => {
          if (err) throw err;
          inquirer
              .prompt([
                  {
                      type: "list",
                      name: "department",
                      message: "Select the department:",
                      choices: resDepartments.map(
                          (department) => department.department_name
                      ),
                  },
                  {
                      type: "list",
                      name: "employee",
                      message: "Select the employee to add a manager to:",
                      choices: resEmployees.map(
                          (employee) =>
                              `${employee.first_name} ${employee.last_name}`
                      ),
                  },
                  {
                      type: "list",
                      name: "manager",
                      message: "Select the employee's manager:",
                      choices: resEmployees.map(
                          (employee) =>
                              `${employee.first_name} ${employee.last_name}`
                      ),
                  },
              ])
              .then((answers) => {
                  const department = resDepartments.find(
                      (department) =>
                          department.department_name === answers.department
                  );
                  const employee = resEmployees.find(
                      (employee) =>
                          `${employee.first_name} ${employee.last_name}` ===
                          answers.employee
                  );
                  const manager = resEmployees.find(
                      (employee) =>
                          `${employee.first_name} ${employee.last_name}` ===
                          answers.manager
                  );
                  const query =
                      "UPDATE employee SET manager_id = ? WHERE id = ? AND role_id IN (SELECT id FROM roles WHERE department_id = ?)";
                  connection.query(
                    query,
                        [manager.id, employee.id, department.id],
                        (err, res) => {
                            if (err) throw err;
                            console.log(
                                `Added manager ${manager.first_name} ${manager.last_name} to employee ${employee.first_name} ${employee.last_name} in department ${department.department_name}!`
                            );
                            // restart the application
                            start();
                        }
                    );
                });
        });
    });
}
// function to update an employee role
function updateEmployeeRole() {
  const queryEmployees =
      "SELECT employee.id, employee.first_name, employee.last_name, roles.title FROM employee LEFT JOIN roles ON employee.role_id = roles.id";
  const queryRoles = "SELECT * FROM roles";
  connection.query(queryEmployees, (err, resEmployees) => {
      if (err) throw err;
      connection.query(queryRoles, (err, resRoles) => {
          if (err) throw err;
          inquirer
              .prompt([
                  {
                      type: "list",
                      name: "employee",
                      message: "Select the employee to update:",
                      choices: resEmployees.map(
                          (employee) =>
                              `${employee.first_name} ${employee.last_name}`
                      ),
                  },
                  {
                      type: "list",
                      name: "role",
                      message: "Select the new role:",
                      choices: resRoles.map((role) => role.title),
                  },
              ])
              .then((answers) => {
                  const employee = resEmployees.find(
                      (employee) =>
                          `${employee.first_name} ${employee.last_name}` ===
                          answers.employee
                  );
                  const role = resRoles.find(
                      (role) => role.title === answers.role
                  );
                  const query =
                      "UPDATE employee SET role_id = ? WHERE id = ?";
                  connection.query(
                      query,
                      [role.id, employee.id],
                      (err, res) => {
                          if (err) throw err;
                          console.log(
                              `Updated ${employee.first_name} ${employee.last_name}'s role to ${role.title} in the database!`
                        );
                    }
                });
        });
    }
    
    process.on("exit", () => {
      connection.end();