import { Branch, IBranch } from "@/domain/models/Branch.model";
import AppError from "@/interface/utils/AppError";
export class BranchService {

    async create(branchData: IBranch) {
        if (!branchData.name) throw new AppError("Name is required", 400)
        const branch = await Branch.create({ ...branchData })
        if (!branch) throw new AppError("Failed to created,try again", 500)
        return branch
    }
    async getById(branchId:string){
        const branch = await Branch.findById({_id:branchId});
        if(!branch) throw new AppError("Branch not found",404);
        return branch;
    }
}