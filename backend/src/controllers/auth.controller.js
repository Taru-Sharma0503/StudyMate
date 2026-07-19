const user = require("../models/user.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Session = require("../models/sessions.model");
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
      sameSite: "none",
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
      user: {
        id: currUser._id,
        email: currUser.email,
        username: currUser.username,
      },
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

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Please fill a valid email address",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
      });
    }

    const isExisting = await user.findOne({ email });
    if (isExisting) {
      return res.status(400).json({
        message: "A user with this email already exists",
      });
    }

    const currUser = await user.create({
      email,
      username,
      password,
    });

    return res.status(200).json({
      message: "User registered successfully",
      user: {
        id: currUser._id,
        email: currUser.email,
        username: currUser.username,
      },
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

async function profile(req, res) {
  try {
    const refreshToken = req.cookies.token;
    if (!refreshToken) {
      return res.status(401).json({ message: "No active session detected" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const currUser = await user.findById(decoded.id).select("-password");

    if (!currUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Profile fetched successfully", user: currUser });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  loginUser,
  registerUser,
  logoutUser,
  refreshToken,
  profile,
};
