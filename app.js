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

//Should I be using var, or const here?
var questions = [
    {
    type: "input",
    name: "role",
    message: "What is your position at the company?"
},

{
    type: "input",
    name: "name",
    message: "What is your name?"
},
{
    type: "input",
    name: "id",
    message: "What is your employee ID number?"
},

{
    type: "input",
    name: "email",
    message: "Please enter you email address",
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
    message: "What type of employee would you like to add?",
    choices: ["Manager", "Engineer", "Intern"],
    name: "role"
  }
];
//Create targeted quesitons for manager, engineer, and intern. 
//For a manager ask for their office number 
//For an engineer ask for their github user name 
//For an intern ask for their school

const managerQuestions = {
  type: "input",
  message: "What is the manager's office number?",
  name: "number"
};

const engineerQuestions = {
  type: "input",
  message: "What is the engineer's github account name?",
  name: "gitAcct"
};

const internQuestions = {
  type: "input",
  message: "What shcool is the intern attending?",
  name: "schoolIntern"
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

 
  //Creating a new manager 
  //Use the "employee" answers for all but the office number
  if (role === "Manager") {
    const officenumber = await inquirer.prompt(managerQuestions);
    const officeNumber = officenumber.number;
    //Creating a new employee with the manager info.
    const employee = new Manager(name, id, email, officeNumber);
    // push the manager constructor object into the employee array
    employeeArray.push(employee);
    //Creating an engineer
    //need to use gitAcct response 
  } else if (role === "Engineer") {
    const gitHub = await inquirer.prompt(engineerQuestions);
    const github = gitHub.gitAcct
    const employee = new Engineer(name, id, email, github);
    // push the engineer constructor object into the employeeArray
    employeeArray.push(employee);
    //Creating an intern
  } else if (role === "Intern") {
    const schoolObj = await inquirer.prompt(internQuestions);
    const school = schoolObj.schoolIntern
    const employee = new Intern(name, id, email, school);
    // push the intern constructor object into employeeArray
    employeeArray.push(employee);
  };
    // Ask them if they want to add another employee
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


//Calling the function to pass in all employee objects
//const teamInfo = render(employeeArray);

// After the user has input all employees desired, 
//call the `render` function (required
// above) and pass in an array containing all employee objects;
// the `render` function will
// generate and return a block of HTML including templated divs 
//for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. 
//Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` 
//above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// function writeToFile(fileName, data) {
//     console.log(fileName, data)
//      fs.writeFileSync(path.join(process.cwd(), fileName), data)
// }

// function to initialize 
// function init() {
    //ask mnanger questions
    //with the answers create manager Obj
    //then call a function that will ask (switch case)
    //create engineer
        //ask engineer prompts
        //create engineer with answers
    //create inter
        //askin intern prompts
        //create intern with answers
    //or build our team
//     inquirer.prompt(managerQuestions)
//     .then(data => { 
//         console.log(data)
//         const manager = new Manager(data.name, data.id, data.email)
//         console.log(manager);
//          //push it into an array    
//     })
// }
// init();


// //create an array to hold all the responses.
// const employeeArray = [];

// //Function to start inquirer
// async function init() {
//   const userResponse = await inquirer.prompt(questions);
//   //Deconstruct reponses
//   const {name, id, email, role} = userResponse;
//   // If role is manager, ask for office number. 
//   //With that response back, then create a new manager with userResponse and officeNumber response like: const employee = new Manager(name, id, email, officeNumber);
//   if (role === "Manager") {
//     const officenumber = await inquirer.prompt(managerQuestions);
//     //Deconstructing nested object
//     const officeNumber = officenumber.number;
//     const employee = new Manager(name, id, email, officeNumber);
//     // push the manager constructor object into employeesArr
//     employeeArray.push(employee);
    
//   } else if (role === "Engineer") {
//     const gitHub = await inquirer.prompt(engineerQuestions);
//     const github = gitHub.gitUser
//     const employee = new Engineer(name, id, email, github);
//     // push the engineer constructor object into employeesArr
//     employeeArray.push(employee);
//   } else if (role === "Intern") {
//     const schoolObj = await inquirer.prompt(internQuestions);
//     const school = schoolObj.schoolIntern
//     const employee = new Intern(name, id, email, school);
//     // push the intern constructor object into employeesArr
//     employeeArray.push(employee);
//   };
//     // Ask them if they want to add another employee
//   const restartInquirer = await inquirer.prompt(restartQuestion);
//   const {restart} = restartInquirer;
//   if (restart === "yes") {
//       init();
//   } else {
//     console.log(employeesArr)
//     //After adding employees, call render function and pass into it the employeesArr. 
//     //The HTML generated in HTMLrender will be store in the const teamfile
//     const teamfile = render(employeesArr);
//     //write the team.html and store it in the output path via outputPath. Write the content from the HTML stored in teamfile
//     fs.writeFile(outputPath, teamfile, function(err){
//       if(err){
//         throw err;

// // HINT: each employee type (manager, engineer, or intern) has slightly different
// // information; write your code to ask different questions via inquirer depending on
// // employee type.

// // HINT: make sure to build out your classes first!
// // Remember that your Manager, Engineer,
// // and Intern classes should all extend from a 
// //class named Employee; 
// //see the directions
// // for further information. Be sure to test out each class and verify it generates an
// // object with the correct structure and methods. This structure will be crucial in order
// // for the provided `render` function to work! ```
