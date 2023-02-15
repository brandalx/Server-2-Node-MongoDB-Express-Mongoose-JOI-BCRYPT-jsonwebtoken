const express = require("express");
const router = express.Router();
const { CategoryModel } = require("../models/categoriesModel");

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

module.exports = router;
