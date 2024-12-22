import { Router} from "express";
import UserRouter from "./user.router";
import BranchRouter from "./branch.router"
import ProductRouter from "./product.router"
import CheckoutRouter from "./checkout.router"

const appRouter = Router();
appRouter.use("/users",UserRouter);
appRouter.use("/branch",BranchRouter);
appRouter.use("/product",ProductRouter)
appRouter.use("/payment",CheckoutRouter)
export {appRouter};