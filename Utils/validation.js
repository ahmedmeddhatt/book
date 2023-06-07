const passwordValidator = require('password-validator');

// Create a schema
const schema = new passwordValidator();
const bcrypt = require('bcryptjs')


// Email Validation //
exports.isValidEmail = (email) => {
    // Regular expression pattern to match basic email structure
    const emailRegex = /\S+@\S+\.\S+/;
  
    // Check if the email matches the basic structure
    if (!emailRegex.test(email)) {
      return false;
    }
  
    // Additional validation logic
    // You can add more checks here based on your requirements
  
    // Check if the email contains a valid domain
    const domain = email.split('@')[1];
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!domainRegex.test(domain)) {
      return false;
    }
  
    // Check if the email contains a valid username
    const username = email.split('@')[0];
    const usernameRegex = /^[a-zA-Z0-9._%+-]+$/;
    if (!usernameRegex.test(username)) {
      return false;
    }
  
    // All checks pass, the email is considered valid
    return true;
  };



// Password Validation //
exports.isValidPassword = (password) => {
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
    
    return schema.validate(password);
}


// Compare Password
exports.comparePass = async function(password, hashedPass) {
  return await bcrypt.compare(password, hashedPass);
};