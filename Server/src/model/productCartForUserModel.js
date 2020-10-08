import { model, Schema } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userProductCartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "Provide UserId!"],
    unique: true,
  },
  cartItems: {
    type: [Schema.Types.ObjectId],
  },
});

userProductCartSchema.plugin(mongooseUniqueValidator);

export const UserProductCart = model("UserProductCart", userProductCartSchema);
