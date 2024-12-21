import { Router} from "express";
import UserRouter from "./user.router";
import BranchRouter from "./branch.router"
import ProductRouter from "./product.router"

const appRouter = Router();
appRouter.use("/users",UserRouter);
appRouter.use("/branch",BranchRouter);
appRouter.use("/product",ProductRouter)
export {appRouter};