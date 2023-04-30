import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },

  username: {
    type: String,
    unique: true,
  },
  FirstName: { type: String },
  LastName: { type: String },
  City: { type: String },

  AddressLine: { type: String },
  PhoneNumber: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

const User = mongoose.model("User", userSchema);

export default User;
