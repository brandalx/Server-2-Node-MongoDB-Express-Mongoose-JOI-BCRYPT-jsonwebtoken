const express = require("express");
const router = express.Router();
const { DrinkModel, validateJoi } = require("../models/drinksModel");

//In POSTMAN  change: request type to to GET, choose Body ===> row

// GET request handle
//Query example: http://localhost:3002/drinks/?page=1&sort=name&desc=yes

router.get("/", async (req, res) => {
  let perPage = 5;
  // Variable to list the page
  let page = req.query.page - 1 || 0;
  // Variable to sort if not will use an mongo _id
  let sort = req.query.sort || "_id";
  // Variable to sort by acs or desc order
  let desc = req.query.desc == "yes" ? 1 : -1;
  try {
    let data = await DrinkModel.find({})
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
//Query example: http://localhost:3002/drinks/search/?search=hotel
router.get("/search", async (req, res) => {
  let querySearch = req.query.search;
  //Regular Expression added to handle query request as non key sensative "i"
  let searchExpression = new RegExp(querySearch, "i");
  try {
    let data = await DrinkModel.find({
      // Or built in Mongoose function for Mongo DB to make search for keys name, info, type of the drink
      $or: [
        { name: searchExpression },
        { info: searchExpression },
        { type: searchExpression },
      ],
    }).limit(20);
    //limits result as 20 items max
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

//exports whole drinks route to config routes
module.exports = router;
