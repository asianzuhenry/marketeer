import express from "express";
import {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/ProductController";
import { authenticate, authorize } from "../middleware/auth";

const router = express.Router();

// Public routes
router.get("/", getAllProducts); // Get all products (with optional filters)

// Protected routes (require authentication) - PUT SPECIFIC ROUTES BEFORE DYNAMIC ONES
router.get("/my/products", authenticate, getMyProducts); // Get my products - MUST BE BEFORE /:id
router.post("/", authenticate, authorize("seller", "admin"), addProduct); // Add product (seller only)

// Dynamic routes (should come after specific routes)
router.get("/:id", getProduct); // Get single product
router.put("/:id", authenticate, updateProduct); // Update product (owner only)
router.delete("/:id", authenticate, deleteProduct); // Delete product (owner or admin)

export default router;