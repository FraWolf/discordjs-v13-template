import mongoose from "mongoose";

const { Schema } = mongoose;

const users = new Schema({
  userId: { type: String, index: { unique: true } },
  creationDate: Date,
});

export default () => mongoose.model("users", users);
