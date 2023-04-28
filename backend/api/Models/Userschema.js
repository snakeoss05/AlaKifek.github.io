import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
  City: { type: String },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  AddressLine: {
    type: String,
  },
  PhoneNumber: {
    type: String,
  },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

export default User;
