const config = require("../config/auth.config");
const customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

signUp = async (req, res) => {
  const {name, email, adress, password} = req.body;
  //hash password
  const salt = 10;
  const hashPassword = bcrypt.hashSync(password, salt);
  //check by name if already exists
  try {
    let customersByName = await customer.selectByName(name);
    if (customersByName.length !== 0) {
        res.status(400).send({
            message: "Failed! Username is already in use!"
          });
          return;
    }
  } catch (err){
        console.error(err);
  }
  //check by email if already exists
  try {
    let customersByEmail = await customer.selectByEmail(email);
      if (customersByEmail.length !== 0) {
          res.status(400).send({
              message: "Failed! Email is already in use!"
            });
          return;
      }
  } catch (err){
       console.error(err);
  }
  //insert in database
  try {
    let result = await customer.insertCustomer(name, email, adress, hashPassword);
    if (result.length !== 0) {
        res.status(400).send({
            message: "User was registered successfully!"
          });
          return;
    }
    } catch (err){
        console.error(err);
    }
}    

signIn = async (req, res) => {
  const {email, password} = req.body;
  try {
     const results = await customer.selectByEmail(email);

      if (Boolean(results.length) === false) {
        return res.status(404).send({message: "User Not found."});               
      }

      const customerSignedIn = results[0];
      //check password against hash
      let resultComparison = bcrypt.compareSync(
        password, customerSignedIn.password.toString());

        if (resultComparison === true) {
          const token = jwt.sign({ id: customerSignedIn.customer_id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });       
    
          res.status(200).send({
                      customer_id: customerSignedIn.customer_id,
                      name: customerSignedIn.name,
                      email: customerSignedIn.email,
                      adress: customerSignedIn.address,
                      rights: customerSignedIn.rights,
                      accessToken: token
                    });
        }
        else if (resultComparison === false) {
          res.status(401).send({
                 accessToken: null,
                 message: "Invalid Password!"
               });
        }      

  } catch (err){
       console.error(err);
  }
}

const authentication = {
  signUp: signUp,
  signIn: signIn
}

module.exports = authentication;