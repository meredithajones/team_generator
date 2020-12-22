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
const questions = [
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
    },
}
];

employee.method();
manager.method();
engineer.method();
intern.method();   

// inquirer.prompt(questions).then((answers) => {
//     console.log(JSON.stringify(answers, null, '  '));
//   });



// Setting up questions for managers, engineers and interns.
// For manager, ask office number 
// For engineer ask github user name 
// For intern ask for school name 
// const managerQuestions = [
// {
//     type: "input",
//     message: "What is your manager's office number?",
//     name: "number"
//   },
// ]
//   const engineerQuestions = [
//   {
    // type: "input",
//     message: "What is your engineer's github user name?",
//     name: "gitUser"
//   },
//   ]

//   const internQuestions = [
//   {
//     type: "input",
//     message: "What is your intern's school?",
//     name: "schoolIntern"
//   },
//   ]

//   //Add more employees
// //   

//Calling the function to pass in all employee objects
// const teamInfo = render(employeeArray);

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
function init() {
    inquirer.prompt(input,list)
    .then(data => { 
        console.log(data);
        var temp = html(data)
        writeToFile("output/team.html", temp)
      
            
    })
}
init();

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first!
// Remember that your Manager, Engineer,
// and Intern classes should all extend from a 
//class named Employee; 
//see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
