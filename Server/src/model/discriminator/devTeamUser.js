import { Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

import { User } from "../UserModel";

/**
 * @access only owner/Manager can add the devs account
 * and on successful adding, developers get Email with their Emp-Id and Password(Which they can change)
 * @description Dev Team users are only allowed to login via Emp-Id and Password
 */

const devTeamUserSchema = new Schema({
  techRole: {
    type: String,
    enum: ["Technical Support", "keyboarders", "Advertisement Team"],
    required: [true, "Provide Job Role for the Employess"],
  },

  profilePic: {
    type: String,
  },

  address: {
    type: String,
    required: [true, "Provide employee address"],
  },

  empId: {
    type: String,
    unique: true,
  },
});

devTeamUserSchema.plugin(mongooseUniqueValidator);

export const DevTeamUserModel = User.discriminator(
  "DevTeam",
  devTeamUserSchema
);
