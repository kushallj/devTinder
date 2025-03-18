const validator = require('validator');

const validateFields = (req) => {
    const user = req.body;

    const {firstName, lastName, emailId, password} = user;

    if(firstName.length<4 || firstName.length>50){
        throw new Error("FirstName should be between 4 to 50 characters");
    }

    if(lastName.length<4 || lastName.length>50){
        throw new Error("lastName should be between 4 to 50 characters");
    }

    if(!validator.isEmail(emailId)){
        throw new Error("Enter the email id in the correct format");
    }

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a strong password");
    }
}

module.exports = validateFields;
