const Employee = require('../model/employee');
const valids = require('../validations');

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const mongoose = require("mongoose");


exports.signup = (req, res, next) => {
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email =valids.encodepassword(req.body.email);
  const password =valids.encodepassword(req.body.password);
  const deviceid =req.body.deviceid;
  const appid = req.body.appid;
  const referralid = valids.randomstr();
  const referralby = req.body.referralby;
  const accessToken = req.body.accessToken;
  Employee.findOne({ email }, (err, data) => {
    if(data){
      res.status(200).json({
        message: 'Employee already registered!',
        data
      });
    }
    else{
      const employee = new Employee({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password,
        deviceid:deviceid,
        appid:appid,
        referralid:referralid,
        referralby:referralby,
        accessToken:accessToken
      });
      employee
        .save()
        .then(result => {
          res.status(200).json({
            message: 'Employee registered successfully!',
            employee
          });
        })
        .catch((err) => {
          res.status(400).json({
            message: 'Invalid Details',
            err
          })
          });
    }
  });

}

    exports.accesslogin = (req, res, next) => {
      const email =valids.encodepassword(req.body.email);
      const pwd =valids.encodepassword(req.body.password);

      Employee.findOne({ email }, (err, data) => {
        if (data) {
          if (data.password == pwd) {
            const token  =valids.generateJwt(email);
            data.accessToken = token;
            console.log(token);
            //data.save();
            res.json({
              token: token,
              message: 'Login successfully'
            });
          }
        }
        else {
          res.send({ "Success": "This Email Is not regestered!" });
        }
    });

  }

  exports.ReferredAccounts = (req, res, next) => {
    const referralid = req.body.referralid;

    Employee.find({ referralby: referralid },{ firstname: 1, referralid: 1, _id: 0 },(err, data) => {
      if (data) {
          res.json({
            message: 'Referral Accounts:',
            data
          });
      }
      else {
        res.send({ "Success": "no users found!" });
      }
  });

}
  

exports.tokencheck = (req,res) =>{
  if(data.accessToken == null){
    res.json({
      msg:'Token valid'
    });
  }
  
}
