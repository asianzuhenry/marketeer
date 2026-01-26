import express from 'express';
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// Get all users (admin only)
router.get('/users', authenticate, authorize('admin'), getAllUsers);

// Delete user (admin only)
router.delete('/users/:id', authenticate, authorize('admin'), deleteUser);

export default router