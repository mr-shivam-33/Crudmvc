const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  FirstName: { type: String, default: "", required: true },
  LastName: { type: String, default: "", required: true },
  Email: { type: String, default: "", required: true },
  UserName: { type: String, default: "", required: true },
  Password: { type: String, default: "", required: true },
  create_time: { type: Date, default: Date.now },
  update_time: { type: Date, default: Date.now },
});

const User = mongoose.model("Users", UserSchema, "tbl_Users");

module.exports = { User };
