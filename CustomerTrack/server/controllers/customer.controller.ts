import { Request, Response } from "express";
import Customer from "../models/Customer.model";
import Membership from "../models/MemberShip.model";
let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;


const createCustomer = async(req: Request, res: Response) => {
   try {
     let { firstName, lastName, email, phoneNumber, status } = req.body;
     console.log(req.body)
     if (!firstName || !lastName || !email || !phoneNumber) {
         return res.status(400).json({ message: "Bad Request", error: "Missing or invalid parameters" });
     }
     if(!emailRegex.test(email)){
         return res.status(400).json({ message: "Bad Request", error: "Invalid Email" });
     }
     const membership = await Membership.findOne({name:status});
     console.log(membership)
     if(!membership) return  res.status(404).json({ message: "Not found", error: "Membership is not found" });
    
     let customer =  await Customer.create({...req.body, membershipId: membership._id});
     if(!customer) {
         return res.status(500).json({ message: "Internal Server Error", error: "Failed to add customer ,try again" });
     }
     return res.status(201).json(customer);
   } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
   }


}
 const getAllCustomers = async (_req: Request, res: Response) => {
    try {  
      const customers = await Customer.find().populate('membershipId');
      if (!customers.length) {
        return res.status(404).json({ message: "Not found", error: "Customers is not found" });
      }
      return res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
 const getCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;  
    try {
      
      const customer = await Customer.findById(id).populate('membershipId');
      if (!customer) {
        return res.status(404).json({ message: "Not found", error: "Customer is not found" });
      }
      return res.status(200).json(customer);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
 const updateCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatesData = req.body;  
    try {
      if (updatesData.membershipId) {
        const membership = await Membership.findById(updatesData.membershipId);
        if(!membership) return  res.status(404).json({ message: "Not found", error: "Membership is not found" });
      }
  
      const customer = await Customer.findByIdAndUpdate(id, updatesData, { new: true }).populate('membershipId');

      if (!customer) {
        return res.status(404).json({ message: "Not found", error: "Customer is not found" });
      }
  
      return res.status(200).json(customer);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
   const deleteCustomerById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const customer = await Customer.findByIdAndDelete(id);

      if (!customer) {
        return res.status(404).json({ message: "Not found", error: "Customer is not found" });
      }
      return res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };
export {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
}