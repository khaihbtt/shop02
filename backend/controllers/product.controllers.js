import Product from "../models/product.model.js";
import mongoose from "mongoose";
export const getProduct =  async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export const createProduct = async (req, res) => {
    const product = req.body; // Dữ liệu từ request body

    // Kiểm tra nếu thiếu thông tin cần thiết
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Vui lòng cung cấp thông tin" });
    }

    const newProduct = new Product(product); // Tạo đối tượng sản phẩm mới

    try {
        // Lưu sản phẩm vào MongoDB
        await newProduct.save(); // Thêm dòng này để lưu vào database
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product ID" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteProduct = async function (req, res) {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}