const config = require("../config/auth.config");
const customer = require("../models/customerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.userId = decoded.id;
      console.log(req.userId);
      next();
    });
  };
  
verifyAdmin = async (req, res, next) => {
    console.log(req.userId);
    try {
        const results = await customer.selectRightsById(req.userId);
        //!!! rights = 1 --> customer (default in db querry), rights = 2 --> admin
        if (results.length === 0) {
          res.status(404).send({
            message: "Failed! Customer not found!"
          });
          return;
        }
        const rights = results[0].rights;
        console.log(rights);
        if (rights === 0) {
            res.status(404).send({
                message: "Failed! Customer not found!"
              });
              return;
        }
        if (rights === 1) {
            res.status(403).send({
              message: "Require Admin Role!"
            });
        }
        if (rights === 2) {
            next();
            return;
        }
        return;
      } catch (err){
            console.error(err);
      }
};

const authorisation = {
    verifyToken: verifyToken,
    verifyAdmin: verifyAdmin
  }
  
module.exports = authorisation;