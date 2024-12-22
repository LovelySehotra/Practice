import { CheckoutService } from "@/application/services/Checkout/CheckoutService";
import { NextFunction, Request, Response } from "express";

export class CheckoutController {
    private checkoutService:CheckoutService
    constructor(checkoutService:CheckoutService) {
        this.checkoutService= checkoutService;

    }
    createCheckout = async (req: Request, res: Response, next: NextFunction) => {
            const checkout = await this.checkoutService.create()
            return res.status(201).json(checkout)
    }
    stripeWebook = async(req:Request,res:Response,next:NextFunction)=>{
        const checkout = await this.checkoutService.stripeWebhook
        return res.status(200).json(checkout)
    }
}