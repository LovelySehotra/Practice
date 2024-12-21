import { Branch } from "@/domain/models/Branch.model";
import { Product } from "@/domain/models/Product.model";
import AppError from "@/interface/utils/AppError";
import mongoose from "mongoose";


export class ProductService {
    // private userService
    constructor() {

    }
    async create(productData: any) {
        const { branches, ...otherData } = productData;
        const validBranchIds = await Promise.all(
            branches.map(async (branchId) => {
                if (!mongoose.Types.ObjectId.isValid(branchId)) {
                    throw new AppError(`Invalid branch Id: ${branchId}`, 404)
                }
                const branchExists = await Branch.exists({ _id: branchId });
                if (!branchExists) {
                    throw new AppError(`Branch with ID ${branchId} does not exist`, 404)
                }
                return branchId
            })
        )
        const product = await Product.create({ ...otherData, branches: validBranchIds });
        return product;
    }
    async getById(productId: string) {
        if (!productId) throw new AppError("Product ID is required", 401)
        const product = await Product.findById({ _id: productId });
        return product;
    }
    async getAll(isAdmin?:boolean) {
        const query = isAdmin ? {} : { status: { $ne: "Hold" } };
        const products = await Product.find(query).populate("branches", "name");
        return products;
    }
    async update(productId,updateData) {
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new AppError("Invalid product ID",401);
        }
        const { branches, ...otherUpdates } = updateData;
        let updatedBranches: string[] | undefined;
        if (branches) {
            // Validate and filter branch IDs
            const validBranchIds = await Promise.all(
                branches.map(async (branchId) => {
                    if (!mongoose.Types.ObjectId.isValid(branchId)) {
                        throw new AppError(`Invalid branch ID: ${branchId}`,404);
                    }
                    const branchExists = await Branch.exists({ _id: branchId });
                    if (!branchExists) {
                        throw new AppError(`Branch with ID ${branchId} does not exist`,404);
                    }
                    return branchId; // Valid branch ID
                })
            );
            // Fetch the existing product to retrieve current branches
            const product = await Product.findById(productId);
            if (!product) {
                throw new AppError("Product not found",404);
            }

            // Merge existing branches with new ones and remove duplicates
            updatedBranches = Array.from(new Set([...product.branches, ...validBranchIds].map((id) => id.toString())))
        
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            {
              ...otherUpdates,
              ...(updatedBranches && { branches: updatedBranches }),
            },
            { new: true, runValidators: true }
          );
        
          // Handle case where product is not found
          if (!updatedProduct) {
            throw new AppError("Product not found during update",404);
          }
        
          return updatedProduct;
    }
}
    