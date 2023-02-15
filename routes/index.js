const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Index router works correctly" });
});

module.exports = router;
