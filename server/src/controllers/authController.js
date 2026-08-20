import { generateToken } from "../config/authToken.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// ================= REGISTER =================
export const UserRegister = async (req, res, next) => {
  try {
    const { fullName, username, email, password } = req.body;

    // ── Validation ──────────────────────────────────────────────
    if (!fullName || !email || !password) {
      const error = new Error("Full name, email, and password are required");
      error.statusCode = 400;
      return next(error);
    }

    if (password.length < 8) {
      const error = new Error("Password must be at least 8 characters");
      error.statusCode = 400;
      return next(error);
    }

    // ── Duplicate checks ─────────────────────────────────────────
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      const error = new Error("Email already exists");
      error.statusCode = 400;
      return next(error);
    }

    if (username) {
      const existingUsername = await User.findOne({
        username: username.toLowerCase(),
      });
      if (existingUsername) {
        const error = new Error("Username already taken");
        error.statusCode = 400;
        return next(error);
      }
    }

    // ── Hash password & create user ──────────────────────────────
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      username: username ? username.toLowerCase() : undefined,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Return user without password
    const userData = newUser.toObject();
    delete userData.password;

    res.status(201).json({
      success: true,
      message: "Registration successful! Please log in.",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// ================= LOGIN =================
export const UserLogin = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    if (!emailOrUsername || !password) {
      const error = new Error("Email/username and password are required");
      error.statusCode = 400;
      return next(error);
    }

    // Look up by email OR username
    const identifier = emailOrUsername.toLowerCase();
    const existingUser = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!existingUser) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    // Set JWT cookie
    generateToken(existingUser._id, res);

    const userData = existingUser.toObject();
    delete userData.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

// ================= LOGOUT =================
export const UserLogout = (_req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),       // Expire immediately
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ================= GET CURRENT USER (session restore) =================
export const GetMe = async (req, res, next) => {
  try {
    // req.user is set by the Protect middleware
    res.status(200).json({ success: true, data: req.user });
  } catch (error) {
    next(error);
  }
};
