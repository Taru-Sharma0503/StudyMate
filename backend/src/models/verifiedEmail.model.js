const mongoose = require("mongoose");

const verifiedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "A user with this email already exists"],
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

const verifiedEmailModel = mongoose.model("verifiedEmail", verifiedEmailSchema);

module.exports = verifiedEmailModel;
