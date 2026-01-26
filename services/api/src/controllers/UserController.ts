import { Request, Response } from "express";
import User from "../models/User";

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if user is admin
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin only." });
      return;
    }

    const { role, search } = req.query;

    // Build filter
    const filter: any = {};
    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(filter)
      .select("-password") // Exclude password field
      .sort({ createdAt: -1 });

    res.json({
      message: "Users retrieved successfully",
      count: users.length,
      users,
    });
  } catch (error: any) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single user by ID (admin or own profile)
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if user is admin or requesting their own profile
    if (req.user?.role !== "admin" && req.user?.userId !== id) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error: any) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get current user's profile
export const getMyProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      message: "Profile retrieved successfully",
      user,
    });
  } catch (error: any) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user (admin or own profile)
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, phoneNumber, role } = req.body;

    // Check if user is admin or updating their own profile
    if (req.user?.role !== "admin" && req.user?.userId !== id) {
      res.status(403).json({ message: "Access denied" });
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Only admin can change roles
    if (role && req.user?.role !== "admin") {
      res.status(403).json({ message: "Only admin can change user roles" });
      return;
    }

    // Update fields
    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ email, _id: { $ne: id } });
      if (existingUser) {
        res.status(400).json({ message: "Email already in use" });
        return;
      }
      user.email = email;
    }
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (role && req.user?.role === "admin") user.role = role;

    await user.save();

    // Return user without password
    const updatedUser = await User.findById(id).select("-password");

    res.json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete user (admin only)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if user is admin
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin only." });
      return;
    }

    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user?.userId) {
      res.status(400).json({ message: "You cannot delete your own account" });
      return;
    }

    await User.findByIdAndDelete(id);

    res.json({
      message: "User deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user statistics (admin only)
export const getUserStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if user is admin
    if (req.user?.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admin only." });
      return;
    }

    const totalUsers = await User.countDocuments();
    const buyers = await User.countDocuments({ role: "buyer" });
    const sellers = await User.countDocuments({ role: "seller" });
    const admins = await User.countDocuments({ role: "admin" });

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.json({
      message: "User statistics retrieved successfully",
      stats: {
        total: totalUsers,
        buyers,
        sellers,
        admins,
        recentUsers,
      },
    });
  } catch (error: any) {
    console.error("Get user stats error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};