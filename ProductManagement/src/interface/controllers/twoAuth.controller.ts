
import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { generateQRCodeURL, verifyOTP } from "@/application/services/2FA/TwoFactorService";

export class TwoAuthController{
   
    generateQrcode = catchAsync(async(req:Request,res:Response)=>{
       const qrCode= await generateQRCodeURL();
       console.log(qrCode)
        return res.status(201).json(qrCode);
    })
    verifyUser = catchAsync(async (req: Request, res: Response) => {
        const verify = await verifyOTP(req.body);
        console.log(verify)
        return res.status(200).json(verify);
    });
    
}