import {Router} from "express";
import { createCustomer, deleteCustomerById, getAllCustomers, getCustomerById, updateCustomerById } from "../controllers/customer.controller.ts";

const router = Router();

router.route("/").post(createCustomer).get(getAllCustomers);
router.route("/:id").get(getCustomerById).patch(updateCustomerById).delete(deleteCustomerById);
export default router