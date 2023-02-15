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
