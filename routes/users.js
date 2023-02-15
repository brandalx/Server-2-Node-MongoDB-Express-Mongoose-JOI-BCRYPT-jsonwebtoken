const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel, validateJoi } = require("../models/userModel");
const bcrypt = require("bcrypt");

//Function to generate random amount of starts when JSON response will be returned to the user;
const randomStars = "*".repeat(Math.floor(Math.random() * 10) + 1);

//To someone will have not direct access to the users data base it will send by / to default users route endpoint
router.get("/", async (req, res) => {
  res.json({ msg: "Users endpoint" });
});

router.get("/userInfo", async (req, res) => {
  //req.header is used to send token in the header as more secure way to operate ith sesitive info
  //x-api-key - header name whic will be checked if he does provided valid token
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({
      msg: "You need to have valid token to this endpoint (to authorize",
    });
  }
  try {
    // Verify the authenticity of the token that was sent in the request header
    let decodeToken = jwt.verify(token, "secretWord");
    // Retrieve the user's information from the Mongo data base
    let data = await UserModel.findOne(
      //Searches the user record that matches the _id extracted from the decoded token
      { _id: decodeToken._id },
      // Exclude the user's password from the retrieved data by creating random amount of "*"
      { password: randomStars }
    );
    res.json(data);
  } catch (err) {
    //Throws error if anything above in try block was wrong
    console.log(err);
    res.status(401).json({ err: "Token invalid or expired" });
  }
});

//POST Route for creating a new user with a hashed password by using bcrypt
router.post("/", async (req, res) => {
  let validBody = validateJoi.apply(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    //Encrypting the password property so that it is stored encrypted in the database; salt value of 10
    user.password = await bcrypt.hash(user.password, 10);
    //Then save to Mongo DB occures
    await user.save();
    // Exclude the user's password from the retrieved data by creating random amount of "*"
    user.password = randomStars;
    //JSON wth user data returns to the user
    res.json(user);
  } catch (err) {
    //If a user with the same email already exists in the system the route throwns error
    if ((err.code = 11000)) {
      return res.status(400).json({
        msg: "This email is already exist in our system, please try log in again",
        code: 11000,
      });
    }
    // To handle default error that may thrown if 11000 hasnt occured
    console.log(err);
    res.status(502).json({ err });
  }
});

//exports whole users route to the config
module.exports = router;
