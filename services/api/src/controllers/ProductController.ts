import { Request, Response } from "express";
import Product from "../models/Product";

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, status, search } = req.query;

    // Build filter
    const filter: any = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter)
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json({
      message: "Products retrieved successfully",
      count: products.length,
      products,
    });
  } catch (error: any) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single product by ID
export const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate("seller", "name email phoneNumber");

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error: any) {
    console.error("Get product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add new product (requires authentication)
export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image, price, category, otherImages } = req.body;

    // Validation
    if (!name || !description || !image || !price || !category) {
      res.status(400).json({
        message: "Missing required fields",
        required: ["name", "description", "image", "price", "category"],
      });
      return;
    }

    // Create product
    const product = new Product({
      name,
      description,
      image,
      price,
      category,
      status: "Instock",
      otherImages: otherImages || [],
      seller: req.user?.userId, // From auth middleware
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error: any) {
    console.error("Add product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update product (requires authentication)
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, image, price, category, status, otherImages } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Check if user owns the product
    if (product.seller.toString() !== req.user?.userId) {
      res.status(403).json({ message: "Not authorized to update this product" });
      return;
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (image) product.image = image;
    if (price !== undefined) product.price = price;
    if (category) product.category = category;
    if (status) product.status = status;
    if (otherImages) product.otherImages = otherImages;

    await product.save();

    res.json({
      message: "Product updated successfully",
      product,
    });
  } catch (error: any) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete product (requires authentication)
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    // Check if user owns the product or is admin
    if (product.seller.toString() !== req.user?.userId && req.user?.role !== "admin") {
      res.status(403).json({ message: "Not authorized to delete this product" });
      return;
    }

    await Product.findByIdAndDelete(id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get products by seller (requires authentication)
export const getMyProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ seller: req.user?.userId }).sort({ createdAt: -1 });

    res.json({
      message: "Your products retrieved successfully",
      count: products.length,
      products,
    });
  } catch (error: any) {
    console.error("Get my products error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};