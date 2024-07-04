const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("../../utils/plugins");

const userSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      trim: true,
    },
    UserName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    EmployeeCode: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    Mobile: {
      type: String,
      required: true,
      trim: true,
    },
    UserRole: {
      type: String,
      required: true,
      trim: true,
    },
    PlantCode: {
      type: String,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true, // used by the toJSON plugin
    },
    Status: {
      type: Number,
      default: 1,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * Check if UserName is taken
 * @param {string} UserName - The user's UserName
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUserNameTaken = async function (UserName, excludeUserId) {
  const user = await this.findOne({ UserName, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} Password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (Password) {
  const user = this;
  return bcrypt.compare(Password, user.Password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("Password")) {
    user.Password = await bcrypt.hash(user.Password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model("user", userSchema, "coll_user");

module.exports = User;
