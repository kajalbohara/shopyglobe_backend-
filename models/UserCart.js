import mongoose from "mongoose"

const UserCartSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    user: {
        ref: "User",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      product: {
        ref: "Product",
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      }
      
}, { timestamps: true });

 const UserCart = mongoose.model("UserCart", UserCartSchema);

export default UserCart;

