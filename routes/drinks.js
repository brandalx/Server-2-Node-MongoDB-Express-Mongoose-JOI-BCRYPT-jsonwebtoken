const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Drinks router works correctly" });
});

module.exports = router;
