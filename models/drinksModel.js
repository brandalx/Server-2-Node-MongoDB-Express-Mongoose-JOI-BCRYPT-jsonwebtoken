const mongoose = require("mongoose");
const Joi = require("joi");

//Definition for Schema to make request to Mongo DB
let schema = new mongoose.Schema({
  name: String,
  info: String,
  type: String,
  price: Number,
  img_url: String,
  date_created: {
    type: Date,
    default: Date.now,
  },
});

exports.DrinkModel = mongoose.model("drinks", schema);

//Definition to Joi validator to make checks that requests sended to DB are valid for creqted schema

exports.validateJoi = (_reqBody) => {
  //New schema object for valiation which contains all important limitations for PUT and POST CRUD requests
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(150).required(),
    info: Joi.string().min(2).max(150).required(),
    type: Joi.string().min(2).max(150).required(),
    price: Joi.number().min(2).max(150).required(),
    img_url: Joi.string().min(2).max(150).allow(null, ""),
  });
  return joiSchema.validate(_reqBody);
};
