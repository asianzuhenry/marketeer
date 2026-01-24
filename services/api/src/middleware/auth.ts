import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/generateToken';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    // Format: "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Invalid token format' });
      return;
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error: any) {
    console.error('Authentication error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Optional: Role-based authorization
export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ message: 'Insufficient permissions' });
      return;
    }

    next();
  };
};