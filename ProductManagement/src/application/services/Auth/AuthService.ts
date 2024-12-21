import { User } from "@/domain/models";
import { JwtService } from "./JwtService";
import AppError from "@/interface/utils/AppError";
export class AuthService{
    constructor( 
        private jwtService: JwtService){
        
    }
   async signup(userData:{email:string,password:string}){
    const userExists = await User.findOne({email:userData.email});
    if (userExists) throw new AppError("User already exist",401)
    const newUser = await User.create(userData);
    return newUser;
   } 
   async login(loginCredentials: { email: string; password: string }) {
    const { email, password } = loginCredentials;
    const user = await User.findOne({ email });
    if (!user) throw new AppError('User not found',404);
    // const accessToken = this.jwtService.createAccessToken(user._id)
    return user;
}
}