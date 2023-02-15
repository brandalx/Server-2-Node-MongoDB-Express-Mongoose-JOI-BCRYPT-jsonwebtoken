const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Users router works correctly" });
});

module.exports = router;
