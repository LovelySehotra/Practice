import { User } from "@/domain/models";
import AppError from "@/interface/utils/AppError";
export class UserService{
    constructor( 
       ){
        
    }
  async getUserByUserType(userId:string,userType:any){
        const user =await User.findOne({_id:userId,userTypes:userType})
        if(!user) throw new AppError("User not found",400);
        return user
  }
}
