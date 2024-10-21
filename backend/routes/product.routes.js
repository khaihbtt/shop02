import express from "express"; // Đúng cú pháp import

import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controllers.js";

const router = express.Router(); // Sửa cú pháp tạo router

// GET all products
// router.get("/", getProduct);
router.route("/").get(getProduct);
// POST a new product
// router.post('/', createProduct);
router.route("/").post(createProduct);
// PUT (update) a product by ID
// router.put("/:id", updateProduct);
router.route("/:id").put(updateProduct);
// DELETE a product by ID
// router.delete("/:id", deleteProduct);
router.route("/:id").delete(deleteProduct);

export default router; // Xuất router
