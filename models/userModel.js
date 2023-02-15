const mongoose = require("mongoose");
const Joi = require("joi");
//Import for Json Web Token for user authentication and authorization
const jwt = require("jsonwebtoken");

//Basic user scema model for Mongo Data Base
let schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date_created: {
    type: Date,
    default: Date.now,
  },
});
//Scema import to users route
exports.UserModel = mongoose.model("users", schema);

//Joi validation Schema
exports.validateJoi = (_reqBody) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    // .email() validate with an inner methods of Joi if type of entered information in emaik key are valid
    email: Joi.string().min(8).max(20).email().required(),
    password: Joi.string().min(6).max(100).required(),
  });
  //returns valid schema
  return joiSchema.validate(_reqBody);
};
// Function thats generates a JSON web token for a given user id
exports.createToken = (user_id) => {
  //                        payload    | the secret key |  options object (will expire in 60 minutes)
  let token = jwt.sign({ _id: user_id }, "secretWord", { expiresIn: "60mins" });
  return token;
};

//Joi validation schema for Log in
exports.validateLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(1).max(300).email().required(),
    password: Joi.string().min(1).max(100).required(),
  });
  return joiSchema.validate(_reqBody);
};
