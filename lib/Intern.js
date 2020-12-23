// TODO: Write code to define and export the Intern class.  
//HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee{
    constructor(){
        super()
    }
    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return "Employee"
    }
}


getSchool()
getRole() // Overridden to return 'Intern'

module.exports = intern  