const express = require("express");
const router = express.Router();

//To someone will have not direct access to the users data base it will send by / to default users route endpoint
router.get("/", async (req, res) => {
  res.json({ msg: "Users endpoint" });
});

//exports whole users route to the config
module.exports = router;
