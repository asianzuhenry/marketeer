import express from 'express';
import { authenticate, authorize } from '../middleware/auth';
import User from '../models/User';
import {
  getAllUsers,
  getUser,
  getMyProfile,
  updateUser,
  deleteUser,
  getUserStats,
} from "../controllers/UserController";

const router = express.Router();

// Get current user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    console.log('Profile request for user:', req.user?.userId);
    
    const user = await User.findById(req.user?.userId).select('-password');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({
      message: 'Profile retrieved successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        bio: user.bio,
        phoneNumber: user.phoneNumber,
        createdAt: user.createdAt
      }
    });
  } catch (error: any) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { name, bio, phoneNumber } = req.body;
    
    const user = await User.findById(req.user?.userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Update fields
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        bio: user.bio,
        phoneNumber: user.phoneNumber
      }
    });
  } catch (error: any) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Protected routes (require authentication)
router.get("/me", authenticate, getMyProfile); // Get current user's profile
router.get("/stats", authenticate, authorize("admin"), getUserStats); // Get user statistics (admin only)
router.get("/", authenticate, authorize("admin"), getAllUsers); // Get all users (admin only)
router.get("/:id", authenticate, getUser); // Get single user (admin or own profile)
router.put("/:id", authenticate, updateUser); // Update user (admin or own profile)
router.delete("/:id", authenticate, authorize("admin"), deleteUser); // Delete user (admin only)

export default router;