import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { ProductService } from "@/application/services/Product/ProductService";
import { RedisService } from "@/application/services/Redis/RedisService";

export class ProductController{
    private productService:ProductService;
    private redisService:RedisService;
    constructor(productService:ProductService,redisService:RedisService){
        this.productService = productService;
        this.redisService = redisService;
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
        let product;
        let isCached=false;
        const cachedResult = await this.redisService.getCachedData("product")
        if(cachedResult){
            isCached = true;
            product = cachedResult;
        }else{
         product = await await this.productService.getAll();
         await this.redisService.setCachedData("product",product);
        }
        return res.status(200).json({isCached,product})
    })
    updateProduct = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const product = await this.productService.update(req.params.productId,req.body);
        return res.status(200).json(product)
    })
}