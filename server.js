import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/ProductRoutes.js";
import cartRoutes from "./routes/cartRouter.js";
import userRoutes from "./routes/userRouter.js"

const app = express();
const PORT =7000;
const MONGO_URI = "mongodb://localhost:27017/shoppyGlobeBackend";
const JWTSECRET = "mykey"; // Replace with your actual secret key

// Middleware
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api", cartRoutes);
app.use("/api/users", userRoutes);
app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  next();
});

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
