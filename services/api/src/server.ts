import express from "express";
import AuthRoutes from './routes/AuthRoutes';
import connectDB from "./config/database";

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hi Mom!");
});

app.use('/api/auth', AuthRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});