import { Router} from "express";
import UserRouter from "./user.router";
import BranchRouter from "./branch.router"
import ProductRouter from "./product.router"
import CheckoutRouter from "./checkout.router"
import TwoAuthRouter from "./twoAuth.router"

const appRouter = Router();
appRouter.use("/users",UserRouter);
appRouter.use("/branch",BranchRouter);
appRouter.use("/product",ProductRouter);
appRouter.use("/payment",CheckoutRouter);
appRouter.use("/two-auth",TwoAuthRouter)
export {appRouter};