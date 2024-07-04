const responseFun = (reqobj) => {
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
};

module.exports = {
  responseFun,
};
