import { model, Schema } from "mongoose";
import { isEmail } from "validator";
import { hash, compare, genSalt } from "bcrypt";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Provide Name !"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Email !"],
      validate: {
        validator: function (val) {
          return isEmail(val);
        },
        message: "Please Enter a valid Email Address",
      },
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please Enter Phone Number"],
      validate: {
        validator: function (val) {
          return String(val).length === 10 && String(val).charAt(0) > 6;
        },
        message: "Enter Valid Number",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Password"],
      select: false,
    },

    confirmPassword: {
      type: String,
      required: [true, "Please Confirm Your Password"],
      select: false,
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "Password Didn't match!",
      },
    },
    userRole: {
      type: String,
      enum: ["user", "seller", "dev"],
      default: "user",
      select: false,
    },

    // if user found misleading account will be set to inactive instaed of deleting
    accountActive: {
      type: Boolean,
      default: true,
    },

    passwordModified: {
      type: Date,
    },

    resetToken: {
      type: Object,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Plugin to show Duplicate entries
userSchema.plugin(mongooseUniqueValidator);

userSchema.pre("save", async function () {
  const salt = await genSalt(12);
  const hashed = await hash(this.password, salt);
  this.password = hashed;
  this.confirmPassword = undefined;
});

// Decrypt Password
userSchema.methods.comparePassword = async function (
  inputPassword,
  dbStoredPassword
) {
  return await compare(inputPassword, dbStoredPassword);
};

userSchema.methods.createUserResetPasswordToken = async function (userId) {
  // Create a new Token from crypto as this is for 5 min only
  // Delete the token once the password is changed
  const resetToken = [...Array(70)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join("");

  await User.findByIdAndUpdate(userId, {
    resetToken: {
      token: resetToken,
      timeStamp: Number(Date.now()) + Number(process.env.PASSWORD_RESET_TIME),
    },
  });

  return resetToken;
};

export default model("User", userSchema);
