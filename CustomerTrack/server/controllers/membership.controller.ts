import { Request,Response } from "express"
import Membership from "../models/MemberShip.model";


const createMembership=async(req:Request,res:Response)=>{
    let { name}=req.body;
    try {
        if(!name)  return res.status(400).json({ message: "Bad Request", error: "Missing or invalid parameters" });
        const membership = await Membership.create({name});
        if(!membership) {
            return res.status(500).json({ message: "Internal Server Error", error: "Failed to create membership ,try again" });
        }
        return res.status(201).json(membership);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
}
const getAllMembership=async(_req:Request,res:Response)=>{
   try {
     const memberships =await Membership.find({});
     if(!memberships) return res.status(404).json({message:"Not Found",error:"Memberships not found"});
     return res.status(201).json(memberships);
   } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error: error });
   }

}
export{
    createMembership,
    getAllMembership
}