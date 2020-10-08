import catchAsyncError from "../utils/catchAsyncError";
import { AppError } from "../utils/AppError";
import { generateJWToken, verifyJWToken } from "../utils/jsonWebToken";
import { Email } from "../utils/mailer";

export const signUpHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.create(req.body);

    const token = await generateJWToken({ id: user._id }, req.body.expiresIn);

    const mailOptions = {
      email: user.email,
      username: user.name,
    };

    let url;
    process.env.NODE_ENV === "production"
      ? (url = `${process.env.DEPLOY_LINK}`)
      : (url = `${process.env.LOCAL_DEPLOY_LINK}`);

    await new Email(mailOptions, url).sendWelcome();

    const { message } = responseMessage;
    res.status(201).json({
      message,
      token,
    });
  });

export const signInHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await ModelName.findOne({ email }).select("+password");

    // Check If User Exists
    if (!user) return next(new AppError(`No user Found With ${email}`, 401));

    // Check user role
    if (user.userRole != "user")
      return next(new AppError("You are not allowed here", 401));

    if (!(await user.comparePassword(password, user.password)))
      // Check Whether Password matches.
      return next(new AppError("Entered Password is Wrong", 401));

    // If password is correct create New Token And Give Access.
    const token = await generateJWToken({ id: user._id }, req.body.expiresIn);

    const { message } = responseMessage;

    res.status(202).json({
      user,
      message,
      token,
    });
  });

export const protectRoute = (ModelName) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.headers.authorization)
      return next(new AppError("Please Login First", 401));
    if (req.headers.authorization) {
      if (!req.headers.authorization.startsWith("Bearer")) {
        return next(new AppError("Bearer Token not Found", 401));
      }
    }

    const auth_token = req.headers.authorization.split("Bearer ")[1];

    const tokenDetails = await verifyJWToken(auth_token);

    const user = await ModelName.findById(tokenDetails.id);
    // if user account is deleted
    if (!user)
      return next(new AppError("Authentication Error Invalid Token", 401));

    req.user = user;
    next();
  });

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.userRole)) next();
    else next(new AppError("You Are Not Allowed to this Operation", 404));
  };
};

export const updateUserDetails = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (req.body.hasOwnProperty("password"))
      return next(new AppError("Not Allowed to change Password", 403));

    const user = await ModelName.findByIdAndUpdate(req.user._id, req.body, {
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      context: "query",
      new: true,
    });

    if (!user) return next(new AppError("No User Found with given Id", 404));

    res.status(200).json({
      responseMessage,
      newDetails: user,
    });
  });

export const forgotPasswordHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const user = await ModelName.findOne({ email: req.body.email });
    if (!user)
      return next(new AppError(`No User Found with ${req.body.email}`, 404));

    const resetToken = await user.createUserResetPasswordToken(user._id);

    let url;
    process.env.NODE_ENV === "production"
      ? (url = `${process.env.DEPLOY_PASSWORD_RESET_LINK}/${resetToken}`)
      : (url = `${process.env.LOCAL_DEPLOY_PASSWORD_RESET_LINK}/${resetToken}`);

    const mailOptions = {
      email: user.email,
      username: user.name,
    };

    await new Email(mailOptions, url).sendResetPassword();

    if (process.env.NODE_ENV === "development") {
      responseMessage.resetToken = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/user/resetPassword/${resetToken}`;
    }

    res.send(responseMessage);
  });

export const resetPasswordHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.body.password || !req.body.confirmPassword)
      return next(new AppError("Provide Password and Confirm Password!!", 422));

    if (req.body.password !== req.body.confirmPassword)
      return next(new AppError("Password didn't match !!", 422));
    const user = await ModelName.findOne({
      "resetToken.token": req.params.token,
    }).select("+password +resetToken");

    if (!user) return next(new AppError("User Token Invalid", 403));

    if (user.resetToken.timeStamp < Date.now())
      return next(new AppError("Reset Token Expired", 401));

    if (await user.comparePassword(req.body.password, user.password))
      return next(
        new AppError("password is same as Previous password!!!", 418)
      );

    user.password = req.body.password;
    user.resetToken = undefined;

    await user.save({ validateBeforeSave: true });
    const token = await generateJWToken({ id: user._id }, req.body.expiresIn);

    responseMessage.token = token;
    res.status(202).json(responseMessage);
  });

// User has to be logged in
export const changeUserPasswordHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.body.currentPassword)
      return next(new AppError("Enter Current Password", 403));

    if (!req.body.password || !req.body.confirmPassword)
      return next(new AppError("Provide Password and Confirm Password!!", 422));

    if (req.body.password !== req.body.confirmPassword)
      return next(new AppError("Password didn't match !!", 422));

    if (req.body.currentPassword === req.body.password)
      return next(
        new AppError(
          "Password can't be changed as current password is same as the password you are requesting to change",
          403
        )
      );

    const user = await ModelName.findById(req.user._id).select("+password");

    if (!(await user.comparePassword(req.body.currentPassword, user.password)))
      return next(new AppError("Entered Password is Wrong", 403));

    user.password = req.body.password;
    await user.save();
    res.status(200).json(responseMessage);
  });

// Dev - Team Handler

export const addDeveloperHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    // preCheck Owner With Password

    // Generate a random password for employer
    const randomPassword = [...Array(10)]
      .map((i) => (~~(Math.random() * 36)).toString(36))
      .join("");

    req.body.password = randomPassword;
    req.body.confirmPassword = randomPassword;

    const employer = await ModelName.create(req.body);

    if (!employer)
      return next(
        new AppError("Something went wrong while adding employer", 500)
      );

    // Create Employee ID
    const employerId = `Lexa-${employer.name.substring(0, 4)}-${String(
      employer._id
    ).substring(String(employer._id).length, 16)}`;

    let employeeDetail;
    try {
      employeeDetail = await ModelName.findByIdAndUpdate(
        employer._id,
        {
          empId: employerId,
        },
        {
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
          context: "query",
          new: true,
        }
      );
    } catch (err) {
      employeeDetail = await ModelName.findByIdAndUpdate(
        employer._id,
        {
          empId: `Lexa-${employer.name.substring(0, 4)}-${String(
            employer._id
          ).substring(String(employer._id))}`,
        },
        {
          upsert: true,
          runValidators: true,
          setDefaultsOnInsert: true,
          context: "query",
          new: true,
        }
      );
    }

    const mailOptions = {
      email: employeeDetail.email,
      username: employeeDetail.name,
    };

    const url = {
      empid: employerId,
      password: randomPassword,
    };

    await new Email(mailOptions, url).sendNewEmployeeWelcome();

    // Mail which contails details about employee -ID which is MongoID
    res.status(201).json({
      message: responseMessage.message,
      employee_id: employerId,
      password: randomPassword,
      employeeDetail,
    });
  });

export const employeeLoginHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.body.employeeId || !req.body.password)
      return next(new AppError("Enter employeeId and Password", 422));

    const employee = await ModelName.findOne({
      empId: req.body.employeeId,
    }).select("+password");

    if (!employee) return next(new AppError("Enter Valid Employee Id", 401));

    const validPassword = await employee.comparePassword(
      req.body.password,
      employee.password
    );

    if (!validPassword)
      return next(new AppError("Enter Password is wrong", 401));

    // 8 hrs valid token
    const token = await generateJWToken({ id: employee._id }, "8h");

    res.status(200).json({
      message: responseMessage.message,
      token,
      user: {
        _id: employee._id,
        userRole: employee.userRole,
        name: employee.name,
        techRole: employee.techRole,
        email: employee.email,
      },
    });
  });

export const addManufacturerHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    const manufacturer = await ModelName.create(req.body);
    if (!manufacturer)
      return next(new AppError("Something went wrong while signingUp", 500));

    // Create Employee ID
    const manufacturerId = `Lexa-MFR-${manufacturer.name.substring(
      0,
      4
    )}-${String(manufacturer._id).substring(
      String(manufacturer._id).length,
      16
    )}`;

    let manufacturerDetail;
    try {
      manufacturerDetail = await ModelName.findByIdAndUpdate(
        manufacturer._id,
        {
          mfrId: manufacturerId,
        },
        {
          upsert: true,
          runValidators: false,
          setDefaultsOnInsert: true,
          context: "query",
          new: true,
        }
      );
    } catch (err) {
      manufacturerDetail = await ModelName.findByIdAndUpdate(
        manufacturer._id,
        {
          mfrId: `Lexa-MFR-${manufacturer.name.substring(0, 4)}-${String(
            manufacturer._id
          ).substring(String(manufacturer._id))}`,
        },
        {
          upsert: true,
          runValidators: false,
          setDefaultsOnInsert: true,
          context: "query",
          new: true,
        }
      );
    }

    const mailOptions = {
      email: manufacturerDetail.email,
      username: manufacturerDetail.name,
    };

    const url = {
      mfrid: manufacturerId,
    };

    await new Email(mailOptions, url).sendNewManufacturerWelcome();

    // Mail which contails details about employee -ID which is MongoID
    res.status(201).json({
      message: responseMessage.message,
    });
  });

export const manufacturerLoginHandler = (ModelName, responseMessage) =>
  catchAsyncError(async (req, res, next) => {
    if (!req.body.manufacturerId || !req.body.password)
      return next(new AppError("Enter manufacturerId and Password", 422));

    const manufacturer = await ModelName.findOne({
      mfrId: req.body.manufacturerId,
    }).select("+password");

    if (!manufacturer)
      return next(new AppError("Enter Valid manufacturer Id", 401));

    const validPassword = await manufacturer.comparePassword(
      req.body.password,
      manufacturer.password
    );

    if (!validPassword)
      return next(new AppError("Enter Password is wrong", 401));

    // 8 hrs valid token
    const token = await generateJWToken(
      { id: manufacturer._id },
      req.body.expiresIn || "24h"
    );

    res.status(200).json({
      message: responseMessage.message,
      token,
      user: {
        _id: manufacturer._id,
        userRole: manufacturer.userRole,
        name: manufacturer.name,
        email: manufacturer.email,
      },
    });
  });
