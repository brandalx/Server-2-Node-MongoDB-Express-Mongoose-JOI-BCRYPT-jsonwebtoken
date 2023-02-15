const express = require("express");
const router = express.require.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Index router works correctly" });
});

module.exports = router;
