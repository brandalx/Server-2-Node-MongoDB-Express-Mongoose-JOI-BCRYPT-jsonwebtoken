const express = require("express");
const router = express.Router();
const { CategoryModel } = require("../models/categoriesModel");

// GET request handle
//Query example: http://localhost:3002/categories/?page=1&sort=name&desc=yes
router.get("/", async (req, res) => {
  //variable to use per page
  let perPage = 5;
  //variable to list the page
  let page = req.query.page - 1 || 0;
  //variable to sort if not will use an mongo _id
  let sort = req.query.sort || "_id";
  //variable to sort by acs or desc order
  let desc = req.query.desc == "yes" ? 1 : -1;

  try {
    let data = await CategoryModel.find({})
      //makes display limit per page
      .limit(perPage)
      //helps to make two variables works together in order to achieve page listing
      .skip(page * perPage)
      //makes an possible to sort by choosen option
      .sort({ [sort]: desc });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

// GET request to search handle
//Query example: http://localhost:3002/categories/search/?search=hotel
router.get("/search", async (req, res) => {
  let querySearch = req.query.search;
  let searchExpression = new RegExp(querySearch, "i");
  try {
    let data = await CategoryModel.find({
      $or: [{ name: searchExpression }, { info: searchExpression }],
    }).limit(20);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
