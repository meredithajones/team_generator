// TODO: Write code to define and export the Manager class.
// HINT: This class should inherit from Employee.

//officeNumber
//getRole() // Overridden to return 'Manager'
const Employee = require("./Employee");

class Manager extends Employee{
    //Data extended from employee
    constructor(name, id, email, officeNumber){
        super(name, id, email)
        //data from manager specific quesiton 
        this.officeNumber = officeNumber;
    }
    getRole(){
        return "Manager"
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager