const indexRoute = require("./index");
const usersRoute = require("./users");
const drinksRoute = require("./drinks");
const categoriesRoute = require("./categories");

exports.routesInit = (app) => {
  app.use("/", indexRoute);
  app.use("/users", usersRoute);
  app.use("/drinks", drinksRoute);
  app.use("/categories", categoriesRoute);
};
