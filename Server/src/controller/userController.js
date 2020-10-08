import { User } from "../model/UserModel";
import { DevTeamUserModel, ManufacturerModel } from "../model/discriminator";

import {
  // middleware
  protectRoute as protectRouteHandler,

  // User
  signUpHandler,
  signInHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  changeUserPasswordHandler,
  updateUserDetails,
  addManufacturerHandler,
  employeeLoginHandler,
  manufacturerLoginHandler,

  // dev
  addDeveloperHandler,
} from "../handlers/userHandler";

export { accreditReact } from "../middleware/accreditReact";
export { restrictTo } from "../handlers/userHandler";
export { preFillManufacturerWareHouseLocation } from "../middleware/preFillers";

export const protectRoute = protectRouteHandler(User);

export const signUp = signUpHandler(User, {
  message: "Signed Up Successfully",
});

export const signIn = signInHandler(User, {
  message: "Signed In Successfully",
});

export const forgotPassword = forgotPasswordHandler(User, {
  message: "Reset Token Sent to registred mail address.",
});

export const resetPassword = resetPasswordHandler(User, {
  message: "Password reset Successfully",
});

export const getMe = (req, res, next) => {
  res.status(200).json({
    message: "requested user",
    user: req.user,
  });
};

export const changeUserPassword = changeUserPasswordHandler(User, {
  message: "Password Changed Successfully",
});

export const updateMe = updateUserDetails(User, {
  message: "User Details Updated",
});

// dev

export const addDevTeamUser = addDeveloperHandler(DevTeamUserModel, {
  message: "Successfully Added Employee",
});

export const employeeSignIn = employeeLoginHandler(DevTeamUserModel, {
  message: "Logged in Successfully",
});

// Manufacturer

export const addNewManufacturer = addManufacturerHandler(ManufacturerModel, {
  message: "Thank you for joining",
});

export const manufacturerSignIn = manufacturerLoginHandler(ManufacturerModel, {
  message: "Logged In Successfully",
});
