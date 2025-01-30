import express from "express";
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from "../controllers/cartControllers.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = express.Router();

router.use(checkAuth);

router.get("/cart", getCartItems);
router.post("/cart", addCartItem);
router.put("/cart/:id", updateCartItem);
router.delete("/cart/:id", deleteCartItem);

export default router;
