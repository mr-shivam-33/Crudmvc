const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toJSON, paginate } = require("../../utils/plugins");
const { required } = require("joi");

const userMsaterSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    UserName: {
      type: String,
      required: true,
      trim: true,
    },
    EmployeeCode: {
      type: Number,
      trim: true,
    },
    Email: {
      type: String,
      trim: true,
    },
    Mobile: {
      type: Number,
      required: true,
      trim: true,
    },
    //FK(RoleMaster -> ID)
    Role: {
      type: String,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
      trim: true,
    },
    Status: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
userMsaterSchema.plugin(toJSON);
userMsaterSchema.plugin(paginate);
const userMsater = mongoose.model(
  "userMsater",
  userMsaterSchema,
  "coll_userMsater"
);

const moduleMsaterSchema = mongoose.Schema(
  {
    ModuleName: {
      type: String,
      required: true,
      trim: true,
    },
    Icon: {
      type: String,
      required: true,
      trim: true,
    },
    ParentId: {
      type: Number,
      required: true,
      trim: true,
    },
    SequenceNo: {
      type: Number,
      required: true,
      trim: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
moduleMsaterSchema.plugin(toJSON);
moduleMsaterSchema.plugin(paginate);
const moduleMsater = mongoose.model(
  "moduleMsater",
  moduleMsaterSchema,
  "coll_moduleMsater"
);

const pageMsaterSchema = mongoose.Schema(
  {
    //FK(ModuleMaster -> ID)
    ModuleId: {
      type: Number,
      trim: true,
    },
    PageName: {
      type: String,
      trim: true,
    },
    DisplayName: {
      type: Number,
      trim: true,
    },
    SequenceNo: {
      type: Number,
      trim: true,
    },
    URL: {
      type: String,
      trim: true,
    },
    Icon: {
      type: String,
      trim: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
pageMsaterSchema.plugin(toJSON);
pageMsaterSchema.plugin(paginate);
const pageMsater = mongoose.model(
  "pageMsater",
  pageMsaterSchema,
  "coll_pageMsater"
);

const rightMsaterSchema = mongoose.Schema(
  {
    RoghtsName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
rightMsaterSchema.plugin(toJSON);
rightMsaterSchema.plugin(paginate);
const rightMsater = mongoose.model(
  "rightMsater",
  rightMsaterSchema,
  "coll_rightMsater"
);

const pageRightsSchema = mongoose.Schema(
  {
    //FK(PageMaster -> ID)
    PageId: {
      type: Number,
      required: true,
      trim: true,
    },
    //FK(RightMaster -> ID)
    RightsId: {
      type: Number,
      required: true,
      trim: true,
    },
    RightsName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
pageRightsSchema.plugin(toJSON);
pageRightsSchema.plugin(paginate);
const pageRights = mongoose.model(
  "pageRights",
  pageRightsSchema,
  "coll_pageRights"
);

const roleMasterSchema = mongoose.Schema(
  {
    RoleName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
roleMasterSchema.plugin(toJSON);
roleMasterSchema.plugin(paginate);
const roleMaster = mongoose.model(
  "roleMaster",
  roleMasterSchema,
  "coll_roleMaster"
);

const roleRightMasterSchema = mongoose.Schema(
  {
    //FK(RoleMaster -> ID)
    RoleId: {
      type: Number,
      required: true,
      trim: true,
    },
    //FK(PageRights -> ID)
    PageRightsId: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
roleRightMasterSchema.plugin(toJSON);
roleRightMasterSchema.plugin(paginate);
const roleRightMaster = mongoose.model(
  "roleRightMaster",
  roleRightMasterSchema,
  "coll_roleRightMaster"
);

const userRightsSchema = mongoose.Schema(
  {
    //FK(User -> ID)
    UserID: {
      type: String,
      required: true,
      trim: true,
    },
    //FK(PageRights -> ID)
    PageRightsId: {
      type: Number,
      required: true,
      trim: true,
    },
    RightUpdateDate: {
      type: String,
      required: true,
      trim: true,
    },
    CompanyID: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
userRightsSchema.plugin(toJSON);
userRightsSchema.plugin(paginate);
const userRights = mongoose.model(
  "userRights",
  userRightsSchema,
  "coll_userRights"
);

module.exports = {
  userMsater,
  moduleMsater,
  pageMsater,
  rightMsater,
  pageRights,
  roleMaster,
  roleRightMaster,
  userRights,
};
