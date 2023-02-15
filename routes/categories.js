const express = require("express");
const router = express.Router();
const { CategoryModel } = require("../models/categoriesModel");

router.get("/", async (req, res) => {
  let perPage = 5;
  let page = req.query.page - 1 || 0;
  let sort = req.query.sort || "_id";
  let desc = req.query.desc == "yes" ? 1 : -1;

  try {
    let data = await CategoryModel.find({})
      .limit(5)
      .skip(page * perPage)
      .sort({ [sort]: desc });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
