const express = require("express");
const authRoute = require("../../module/auth/auth.route");
const userRoute = require("../../module/user/user.route");
const companyRoute = require("../../module/company/company_route");
const productRoute = require("../../module/product/product_route");
const userMasterRoute = require("../../module/userMaster/master_route");
const docsRoute = require("./docs.route");
const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/company",
    route: companyRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/userMaster",
    route: userMasterRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: "/docs",
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
