import { BranchService } from "@/application/services/Branch/BranchService";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";

export class BranchController{
    private branchService;
    constructor(branchService:BranchService){
        this.branchService=branchService
    }
    createBranch = catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const branch = await this.branchService.create(req.body);
        return res.status(201).json(branch);
    })
    getBranchById= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
        const branch = await this.branchService.getById(req.params.branchId);
        return res.status(200).json(branch)
    })
}