// TODO: Write code to define and export the Intern class.  
//HINT: This class should inherit from Employee.

const Employee = require("./Employee");
  

class Intern extends Employee {
    constructor(name, id, email, school) {
        //extended from Employee
        super(name, id, email);
        //from intern specific question
        this.school = school;
    }
    //For testing
    getRole() {
        return "Intern";
    }
    getSchool() {
        return this.school;
    }
};


module.exports = Intern  