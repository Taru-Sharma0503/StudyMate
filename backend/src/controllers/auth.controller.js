const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Session = require("../models/sessions.model");
const sendEmail = require("../services/email.service");
const OTP = require("../models/otp.model");
const verifiedEmail = require("../models/verifiedEmail.model");

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const currUser = await user.findOne({ email }).select("+password");

    if (!currUser) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, currUser.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    const refreshToken = jwt.sign(
      { id: currUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const refreshTokenHash = hashToken(refreshToken);

    const session = await Session.create({
      user: currUser._id,
      refreshTokenHash,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });

    const accessToken = jwt.sign(
      { id: currUser._id, sessionId: session._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    return res.status(200).json({
      message: "User logged in successfully",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function refreshToken(req, res) {
  try {
    const refreshtoken = req.cookies.token;
    if (!refreshtoken) {
      return res.status(401).json({
        message: "No active session detected",
      });
    }

    const decoded = jwt.verify(refreshtoken, process.env.JWT_SECRET);
    const refreshTokenHash = hashToken(refreshtoken);
    const session = await Session.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "No active session detected",
      });
    }

    const accessToken = jwt.sign(
      { id: decoded.id, sessionId: session._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      },
    );

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function registerUser(req, res) {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({
        message: "Email,username and password are required",
      });
    }

    const isExisting = await user.findOne({ email });
    if (isExisting) {
      return res.status(400).json({
        message: "A user with this email already exists",
      });
    }

    const isEmailVerified = await verifiedEmail.findOne({ email, isVerified: true });
    if (!isEmailVerified) {
      return res.status(400).json({
        message: "Email is not verified",
      });
    }

    const currUser = await user.create({
      email,
      username,
      password,
    });

    await verifiedEmail.deleteOne({ email });
    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function logoutUser(req, res) {
  try {
    const refreshToken = req.cookies.token;

    if (!refreshToken) {
      return res.status(401).json({
        message: "No active session detected",
      });
    }

    const refreshTokenHash = hashToken(refreshToken);
    const session = await Session.findOne({
      refreshTokenHash,
      revoked: false,
    });

    if (!session) {
      return res.status(401).json({
        message: "No active session detected",
      });
    }

    session.revoked = true;
    await session.save();

    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function verifyEmail(req, res) {
  try {
    const {email} = req.body;

    if(!email){
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const isExisting = await user.findOne({ email });
    if (isExisting) {
      return res.status(400).json({
        message: "A user with this email already exists",
      });
    }

    await OTP.deleteMany({ email });
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = hashToken(otp);

    await OTP.create({
      email,
      otp: otpHash,
    })

    await sendEmail({
      to: email,
      subject: "Email Verification",
      text: `Your OTP for email verification is ${otp}. It will expire in 5 minutes.`,
    })

    return res.status(200).json({
      message: "OTP sent to email",
    });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function verifyOTP(req, res) {
  try {
    const {email, otp} = req.body;

    if(!email || !otp){
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    const otpHash = hashToken(otp);
    const otpRecord = await OTP.findOne({ email, otp: otpHash });

    if(!otpRecord){
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    await OTP.deleteMany({ email });

    await verifiedEmail.create({
      email,
      isVerified: true,
    });

    return res.status(200).json({
      message: "OTP verified successfully",
    });
  }
  catch(err){
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  verifyEmail,
  verifyOTP,
};
