import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide Sender ID"],
    },
    reciever: {
      type: Schema.Types.ObjectId,
      required: [true, "Provide reciever ID"],
    },

    chats: {
      type: [
        {
          from: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          to: {
            type: Schema.Types.ObjectId,
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
          at: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

chatSchema.pre(/^find/, function (next) {
  this.populate({
    path: "sender",
    model: "User",
    select: "name _id",
  }).populate({
    path: "reciever",
    model: "User",
    select: "name _id",
  });

  next();
});

export default model("Chat", chatSchema);
