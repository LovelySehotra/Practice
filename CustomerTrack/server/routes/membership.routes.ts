import {Router} from "express";
import { createMembership, getAllMembership } from "../controllers/membership.controller.ts";

const router = Router();

router.route("/").post(createMembership).get(getAllMembership);

export default router