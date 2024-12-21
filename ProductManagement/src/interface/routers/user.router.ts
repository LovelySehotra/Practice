import { Router}  from "express";
import { UserController } from "../controllers";
import { AuthService ,JwtService} from "@/application/services";
import { User } from "@/domain/models";

const authService = new AuthService(new JwtService());
const userController = new UserController(authService)
const router = Router();

router.route("/register").post(userController.signupUser);
router.route("/login").post(userController.loginUser)

export default router