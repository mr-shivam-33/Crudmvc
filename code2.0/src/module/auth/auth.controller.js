const httpStatus = require("http-status");
const catchAsync = require("../../utils/catchAsync");
const userService = require("../user/user.service");
const authService = require("./auth.service");
const tokenService = require("../token/token.service");
const emailService = require("../mailer/email.service");

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user.data);
  let finalData = { ...user, data: { user: user.data, ...tokens } };
  res.status(httpStatus.CREATED).json(finalData);
});

const login = catchAsync(async (req, res) => {
  const { UserName, Password } = req.body;
  const user = await authService.loginUserWithUserNameAndPassword(
    UserName,
    Password
  );

  const tokens = await tokenService.generateAuthTokens(user.data);
  let finalData = { ...user, data: { user: user.data, ...tokens } };
  res.status(httpStatus.OK).json(finalData);
});

const logout = catchAsync(async (req, res) => {
  const resObj = await authService.logout(req.body.user);
  res.status(httpStatus.OK).json(resObj);
});

const refreshTokens = catchAsync(async (req, res) => {
  const resObj = await authService.refreshAuth(req.body.refreshToken);
  res.status(httpStatus.OK).json(resObj);
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.Email
  );

  console.log("resetPasswordToken :>> ", resetPasswordToken);
  // await emailService.sendResetPasswordEmail(req.body.Email, resetPasswordToken.data);
  res.status(httpStatus.OK).json(resetPasswordToken);
});

const resetPassword = catchAsync(async (req, res) => {
  let resObj = await authService.resetPassword(
    req.body.token,
    req.body.password
  );
  res.status(httpStatus.OK).json(resObj);
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.user
  );
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
