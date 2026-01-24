import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/generateToken';

export const registerHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Register request received:', req.body);
    
    const { email, password, name, role } = req.body;

    // Validate input
    if (!email || !password || !name) {
      res.status(400).json({ 
        message: 'Missing required fields',
        required: ['email', 'password', 'name']
      });
      return;
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create new user
    const user = new User({ 
      email, 
      password, 
      name,
      role: role || 'buyer'
    });
    
    await user.save();

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Login request received:', { email: req.body.email });
    
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ 
        message: 'Email and password are required' 
      });
      return;
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('Password mismatch for:', email);
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    });

    console.log('Login successful for:', email);
    
    res.json({ 
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        email: user.email, 
        name: user.name,
        role: user.role
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message 
    });
  }
};