export const validateProduct = (req, res, next) => {
    const { name, price, description, stockQty } = req.body;
  
    if (!name) return res.status(400).json({ success: false, message: "Product name is required" });
    if (!price) return res.status(400).json({ success: false, message: "Price is required" });
    if (!description) return res.status(400).json({ success: false, message: "Description is required" });
    if (!stockQty) return res.status(400).json({ success: false, message: "Stock Qty is required" });
  
    next();
  };
  