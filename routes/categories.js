const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Categories router works correctly" });
});

module.exports = router;
