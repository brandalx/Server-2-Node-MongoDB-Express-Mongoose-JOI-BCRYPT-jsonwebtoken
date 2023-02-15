const express = require("express");
const router = express.Router();
const { CategoryModel, validateJoi } = require("../models/categoriesModel");

//In POSTMAN  change: request type to to GET, choose Body ===> row

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

// POST request to handle an adding the new item to data base:
/* Example for valid POST request through POSTMAN:
In POSTMAN  change: request type to to POST, adress to: http://localhost:3002/categories/

{
        "name": "This is new category",
        "info": "Athletic gear and outdoor equipment",
        "cat_url": "https://example.com/sports-outdoors",
        "img_url": "https://example.com/sports-outdoors.jpg"
}
*/

router.post("/", async (req, res) => {
  //Checks first that returned object from Joi validation is even valid, if not throws an error and not continues to make POST request
  let validBody = validateJoi(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  //If returned Joi schema is valid creates an new obejct in JSON  and puts it in data base
  try {
    let category = new CategoryModel(req.body);
    await category.save();
    res.json(category);
    //if any error occures will throw an error
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

//exports whole route to config routes
module.exports = router;
