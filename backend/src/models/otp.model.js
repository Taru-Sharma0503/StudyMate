const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    otp: {
      type: String,
      required: [true, "OTP is required"],
      immutable: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: 300, 
    },
  },
  {
    timestamps: true,
  },
);

const otpModel = mongoose.model("otp", otpSchema);

module.exports = otpModel;
