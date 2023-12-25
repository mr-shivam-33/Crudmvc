const jwt = require("jsonwebtoken");

module.exports = {
  responseFun: (reqobj) => {
    let resobj = {};
    if (reqobj.status == 0) {
      resobj = {
        status: reqobj?.status,
        data: reqobj?.data,
        message: reqobj?.message,
      };
    } else if (reqobj.status == 1) {
      resobj = {
        status: reqobj?.status,
        data: reqobj?.data,
        message: reqobj?.message,
      };
    }
    return resobj;
  },

  // userToken: (data) => {
  //   let token = jwt.sign(
  //     {
  //       id: data.ID,
  //       firstName: data.firstName,
  //       lastName: data.lastName,
  //       email: data.email,
  //       userName: data.userName,
  //       userRole: data.userRole,
  //       plantCode: data.plantCode,
  //       plant: data.plant,
  //       empCode: data.empCode,
  //       permissions: data.permissions,
  //       status: data.status,
  //     },
  //     "controlprint-highresprinter"
  //   );

  //   return token;
  // },
};
