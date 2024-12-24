import { Router}  from "express";
import { TwoAuthController } from "../controllers/twoAuth.controller";
const twoAuthController = new TwoAuthController()
const router = Router();

router.route("/generate-qr").post(twoAuthController.generateQrcode);
router.route("/verify-otp").post(twoAuthController.verifyUser)

export default router