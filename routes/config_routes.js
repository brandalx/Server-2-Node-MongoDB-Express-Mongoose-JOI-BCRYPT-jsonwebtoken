const indexRoute = require("./index");

exports.routesInit = (app) => {
  app.use("/", indexRoute);
};
