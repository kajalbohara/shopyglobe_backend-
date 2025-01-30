import Product from "../models/Product.js";
import {User} from "../models/User.js";
import UserCart from "../models/UserCart.js";

// get cart items 
export const getCartItems = async (req, res) => {
    const userId = req.user.id;
    try {
      const cartItems = await UserCart.find({ user: userId }).populate("product");
      res.status(200).json({ success: true, message: "All Cart Items", cartItems });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

// get all users cart items
export const getAllUsersCart = async (req, res) => {
    try {

        const result = await UserCart.find();
        res.status(200).json({ success: true, messge: "All Cart Item List", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}

// get singlecart item
export const getSingleCartItem = async (req, res) => {
    let id = req.params.id;

    try {

        const result = await UserCart.findById(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }
        res.status(200).json({ success: true, messge: "Cart Item Found", result })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });

    }
}


// add cart item
export const addCartItem = async (req, res) => {
    if (!req.body.quantity || 
        !Number.isInteger(req.body.quantity) || 
        req.body.quantity <= 0) {
        return res.status(403).json({ success: false, message: "Quantity must be a positive integer" });
    }

    if (!req.body.user) {
        return res.status(403).json({ success: false, message: "User is required" });
    }
    if (!req.body.product) {
        return res.status(403).json({ success: false, message: "Product is required" });
    }

    const { product, quantity, user } = req.body;

    try {
        const isMatch = await Product.findById(product);
        const isUserMatch = await User.findById(user);

        if (!isUserMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const result = await UserCart.create({ quantity, product, user });
        res.status(201).json({ success: true, message: "Cart Item added successfully", result });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const updateCartItem = async (req, res) => {
    try {
        console.log("Received PUT request to update cart item.");
        console.log("Params:", req.params);
        console.log("Body:", req.body);

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Cart item ID is required" });
        }

        // 🔹 Use UserCart instead of Cart
        const existingCartItem = await UserCart.findById(id);
        console.log("Existing Cart Item:", existingCartItem);

        if (!existingCartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Update fields
        if (req.body.quantity !== undefined) {
            existingCartItem.quantity = req.body.quantity;
        }

        await existingCartItem.save();
        res.status(200).json({ message: "Cart item updated", cartItem: existingCartItem });

    } catch (error) {
        console.error("Update Cart Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
// delete cart item
export const deleteCartItem = async (req, res) => {
    let id = req.params.id;

    try {
        // 🔹 Find the user
        const userMatch = await User.findById(req.user.id);
        if (!userMatch) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 🔹 Find the cart item
        const isMatch = await UserCart.findById(id);
        if (!isMatch) {
            return res.status(404).json({ success: false, message: "Cart Item not found" });
        }

        // 🔹 Check if the cart item belongs to the user
        if (isMatch.user.toString() === userMatch._id.toString()) {
            const result = await UserCart.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: "Cart Item deleted successfully", result });
        } else {
            return res.status(403).json({ success: false, message: "Unauthorized access" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
};
