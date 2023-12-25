const express = require("express");
var app = express();
var helmet = require("helmet");
const morgan = require("morgan");
var cors = require("cors");
const path = require("path");
var port = 4001;
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
var jwt = require("jsonwebtoken");
const DB = require("./DB/db.connection.js");
const config = require("./config.json");
global.con = DB.con;

app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/*", function (req, res, next) {
  req.headers["socketIpAddress"] = req.socket.remoteAddress.split("::ffff:")[1];
  res.header("Access-Control-Allow-Origin", "*"); //* will allow from all cross domain
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(async function (req, res, next) {
  var token = req.headers["x-access-token"];
  if (token) {
    jwt.verify(token, config.appsecret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, responseMsgCode: "tokenNotFound" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: "No x-access-token provided",
    });
  }
});

const mainRoute = require("./module/mainRouter.js");
app.use("*/module", mainRoute);

app.get("/Local", async (req, res) => {
  res.send("mankind printer apis");
});

app.listen(port, () => {
  console.log(`Server listning on port no. ${port}`);
});
