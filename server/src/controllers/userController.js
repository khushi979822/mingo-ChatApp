import User from "../models/userModel.js";

// ── Get all users (excluding current user) ───────────────────────────────────
export const getAllUsers = async (req, res, next) => {
  try {
    const currentUser = req.user;

    const users = await User.find({ _id: { $ne: currentUser._id } })
      .select("-password")
      .sort({ fullName: 1 });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// ── Search users by name or username ─────────────────────────────────────────
export const searchUsers = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    const regex = new RegExp(q.trim(), "i");

    const users = await User.find({
      _id: { $ne: currentUser._id },
      $or: [{ fullName: regex }, { username: regex }, { email: regex }],
    })
      .select("-password")
      .limit(20);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

// ── Update profile ────────────────────────────────────────────────────────────
export const updateProfile = async (req, res, next) => {
  try {
    const currentUser = req.user;
    const { fullName, email, mobileNumber, bio, profilePicture } = req.body;

    if (email) {
      const existingUser = await User.findOne({
        email,
        _id: { $ne: currentUser._id },
      });
      if (existingUser) {
        const error = new Error("Email already in use");
        error.statusCode = 400;
        return next(error);
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        ...(fullName && { fullName }),
        ...(email && { email: email.toLowerCase() }),
        ...(mobileNumber !== undefined && { mobileNumber }),
        ...(bio !== undefined && { bio }),
        ...(profilePicture !== undefined && { profilePicture }),
      },
      { new: true },
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

// ── Update lastSeen ───────────────────────────────────────────────────────────
export const updateLastSeen = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
  } catch {
    // Silent — not critical
  }
};
