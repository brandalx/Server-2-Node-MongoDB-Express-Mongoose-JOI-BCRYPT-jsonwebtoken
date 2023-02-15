const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");

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
      // Exclude the user's password from the retrieved data
      { password: 0 }
    );
    res.json(data);
  } catch (err) {
    //Throws error if anything above in try block was wrong
    console.log(err);
    res.status(401).json({ err: "Token invalid or expired" });
  }
});

//exports whole users route to the config
module.exports = router;
