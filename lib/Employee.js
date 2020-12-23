// TODO: Write code to define and export the Employee class
//Pass in the data from app.js
//Need to require app.js

//const Employee = require("./employee");

////getName(this.name)
////getId(this.id)
//getEmail(this.email)
//getRole(this.role) // Returns 'Employee'

class Employee{
    constructor(name, id, email){
        this.name= name;
        this.id= id;
        this.email= email; 
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




module.exports = Employee; 