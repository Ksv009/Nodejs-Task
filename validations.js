const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
const rstr = require('randomstring');
const jwt = require('jsonwebtoken');
const Bcrypt = require('bcrypt');
//const saltRounds = 10;

//salt = Bcrypt.genSalt(10);
       

const encodepassword = (password) => {
    return bcrypt.hashSync(password, salt);  
}    

const comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}


let randomstr = () => {
    return rstr.generate({
        length:5,
        charset:'alphanumeric'
    });
}


const generateJwt = (email) => {
      const payload = { email: email};
      const token =  jwt.sign(payload, 'Gemini', {expiresIn:'300'});
      return token;
  }
  

module.exports = {
    encodepassword,
    comparePassword,
    randomstr,
    generateJwt
}

