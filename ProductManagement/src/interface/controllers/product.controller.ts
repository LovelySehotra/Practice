import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { ProductService } from "@/application/services/Product/ProductService";

export class ProductController{
    private productService:ProductService
    constructor(productService:ProductService){
        this.productService = productService
    }

    createProduct = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const product = await this.productService.create(req.body);
        return res.status(201).json(product)
    })
    getProductById = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const product = await this.productService.getById(req.params.productId);
        return res.status(200).json(product)
    })
    getAllProduct = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const products= await this.productService.getAll();
        return res.status(200).json(products)
    })
    updateProduct = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const product = await this.productService.update(req.params.productId,req.body);
        return res.status(200).json(product)
    })
}