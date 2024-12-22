import { Router } from "express";
import { CheckoutController } from "../controllers/checkout.controller";
import { CheckoutService } from "@/application/services/Checkout/CheckoutService";

const checkoutController = new CheckoutController(new CheckoutService())
const router = Router();

router.route("/checkout").post(checkoutController.createCheckout)
router
  .route("/webhook")
  .post(checkoutController.stripeWebook);

export default router;