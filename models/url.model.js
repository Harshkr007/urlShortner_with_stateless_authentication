import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  createdBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required : true,
  },
  visitHistory: [
    {
      timeStamp: {
        type: Date,
      },
    },
  ],
});

export const URL = mongoose.model("URL", urlSchema);
