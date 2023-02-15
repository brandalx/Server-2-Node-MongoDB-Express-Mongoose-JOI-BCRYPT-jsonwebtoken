const express = require("express");
const router = express.Router();
const { CategoryModel } = require("../models/categoriesModel");

router.get("/", async (req, res) => {
  try {
    let data = await CategoryModel.find({});
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
