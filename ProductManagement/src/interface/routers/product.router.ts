import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { ProductService } from "@/application/services/Product/ProductService";
const productController = new ProductController(new ProductService());
const router= Router();

router
.route("/")
.post(productController.createProduct)
.get(productController.getAllProduct)

router
.route("/:productId")
.get(productController.getProductById)
.patch(productController.updateProduct)

export default router;