import express from "express";
import { getProducts, getSingleProducts, addProduct, updateProduct, deleteProduct } from "../controllers/ProductControllers.js";
import { validateProduct } from "../utils/validateProduct.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id",getSingleProducts);
router.post("/", validateProduct, addProduct);
router.put("/:id", validateProduct, updateProduct);
router.delete("/:id", deleteProduct);

export default router;
