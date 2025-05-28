const validator = require('validator');
const bcrypt = require('bcrypt');

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

const validateProfileFields = (req) => {
    const editableFields = [
        "firstName",
        "lastName",
        "age",
        "photoUrl",
        "about",
        "skills",
    ];

    const isEditable = Object.keys(req.body).every((key)=>  editableFields.includes(key));
    if(!isEditable){
        throw new Error("Invalid fields provided for update");
    }

    return isEditable;
}

const validatePassword = async (req) => {
    const currentPassword = req.user.password;

        const loggedInUser = req.user;

        const checkPassword = await bcrypt.compare(req.body.currentPassword, currentPassword);

        return checkPassword;
}

module.exports = {validateFields, validateProfileFields, validatePassword};
