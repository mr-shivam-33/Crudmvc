const httpStatus = require("http-status");
const tokenService = require("../token/token.service");
const userService = require("../user/user.service");
const Token = require("../token/token.model");
const ApiError = require("../../utils/ApiError");
const { tokenTypes } = require("../../config/tokens");
const Q = require("q");

/**
 * Login with username and password
 * @param {string} UserName
 * @param {string} Password
 * @returns {Promise<user>}
 */
const loginUserWithUserNameAndPassword = async (UserName, Password) => {
  var deferred = Q.defer();
  const user = await userService.getUserByUserName(UserName);

  let userObj = {};

  if (user) {
    if (!(await user.isPasswordMatch(Password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Password is not correct");
    } else {
      userObj = {
        status: httpStatus.OK,
        message: "Login success",
        data: user,
      };
    }
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "User not found");
  }

  deferred.resolve(userObj);
  return deferred.promise;
  // return userObj;
};

/**
 * Logout
 * @param {string} user
 * @returns {Promise}
 */
const logout = async (user) => {
  var deferred = Q.defer();
  await Token.deleteMany({
    user: user,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });

  deferred.resolve({
    status: httpStatus.OK,
    message: "Logout success",
    data: user,
  });
  return deferred.promise;
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  var deferred = Q.defer();
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);

    if (!user) {
      throw new Error();
    }

    await Token.deleteOne({
      token: refreshTokenDoc.token,
      type: refreshTokenDoc.type,
      user: refreshTokenDoc.user,
      blacklisted: refreshTokenDoc.blacklisted,
    });

    let generatedToken = await tokenService.generateAuthTokens(user);
    let resObj = {
      status: httpStatus.OK,
      message: "Token Generated",
      data: generatedToken,
    };
    deferred.resolve(resObj);
    return deferred.promise;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  var deferred = Q.defer();
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });

    let resObj = {
      status: httpStatus.OK,
      message: "Password reset success",
      data: { id: user.id, UserName: user.UserName, Email: user.Email },
    };
    deferred.resolve(resObj);
    return deferred.promise;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};

module.exports = {
  loginUserWithUserNameAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
