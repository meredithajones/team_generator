const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

var util= require('util');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");
const { ENGINE_METHOD_RAND } = require("constants");


// Write code to use inquirer to gather information about the 
//development team members,
// and to create objects for each team member 
//(using the correct classes as blueprints!)
var questions = [
   
{
    type: "input",
    name: "name",
    message: "What is the employee's name?"
},
{
    type: "input",
    name: "id",
    message: "What is the employee's ID number?"
},

{
    type: "input",
    name: "email",
    message: "Please enter the employee's email address",
    validate: function (value) {
        let mail = value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        if (mail) {
            return true;
        } else {
            return "Please enter a valid Email address"
        }
    }
},

{
    type: "list",
    name: "role",
    message: "What is the role of the employee you are adding?",
    choices: ["Manager", "Engineer", "Intern"],
},
];
//Create targeted quesitons for exclusive to a manager, engineer, and intern. 
//For a manager ask for their office number 
//For an engineer ask for their github user name 
//For an intern ask for their school

const managerQuestions = {
  type: "input",
  message: "What is the manager's office number?",
  name: "office"
};

const engineerQuestions = {
  type: "input",
  message: "What is the engineer's github account name?",
  name: "gitAcct"
};

const internQuestions = {
  type: "input",
  message: "What school is the intern attending?",
  name: "internSchool"
};

//Find out if the user wants to continue entering empoloyees, or if they are finished. 

const finalQuestion = {
  type: "list",
  message: "Would you like to add another team member?",
  choices: ["yes", "no"],
  name: "restart"
};

//Create an array to hold the answers
const employeeArray = [];

// Start inquirer
async function init() {
  const userResponse = await inquirer.prompt(questions);

  //Holding the responses
  const {name, id, email, role} = userResponse;

 
  //Creating a new manager with office number prompt
  //Use the "employee" answers for all but the office number
  
  if (role === "Manager") {
    const officenumber = await inquirer.prompt(managerQuestions);
    const officeNumber = officenumber.office;
    //Creating a new employee with the manager info.
    const employee = new Manager(name, id, email, officeNumber);
    console.log(new Manager);
    // push the manager constructor object into the employee array
    employeeArray.push(employee);

    //Creating an engineer with gitHub prompt
    //need to use gitAcct response 
  } else if (role === "Engineer") {
    const gitHub = await inquirer.prompt(engineerQuestions);
    const github = gitHub.gitAcct
    const employee = new Engineer(name, id, email, github);
    // push the engineer constructor object into the employeeArray
    employeeArray.push(employee);

    //Creating an intern with school attending prompt
  } else if (role === "Intern") {
    const schoolObj = await inquirer.prompt(internQuestions);
    const school = schoolObj.InternSchool
    const employee = new Intern(name, id, email, school);
    // push the intern object into employeeArray
    employeeArray.push(employee);
  };
    // Ask user if they want to add another employee
  const restartInquirer = await inquirer.prompt(finalQuestion);
  const {restart} = restartInquirer;
  if (restart === "yes") {
      init();
  } else {
    console.log(employeeArray)
    //when all employees are added, call the render function and pass into employeeArray 
    //The HTML generated in HTMLrender will be store in the const teamfile
    const teamfile = render(employeeArray);
    //write the team.html and store it in the output path via outputPath. 
    //Write the content from the HTML stored in teamfile
    fs.writeFile(outputPath, teamfile, function(err){
      if(err){
        throw err;
      }
    });
  };
  
};
init();

function writeToFile(fileName, data) {
    console.log(fileName, data)
     fs.writeFileSync(path.join(process.cwd(), fileName), data)
  
}






