import { Router } from "express";
import { BranchController } from "../controllers/branch.controller";
import { BranchService } from "@/application/services/Branch/BranchService";
const branchController = new BranchController(new BranchService)
const router = Router()
router.route("/").post(branchController.createBranch);
router.route("/:branchId").get(branchController.getBranchById);

export default router;