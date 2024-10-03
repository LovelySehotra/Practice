import app from "./app.ts";
import connectionToDB from "./config/dbconnection.ts";
import dotenv from 'dotenv';
dotenv.config();

let PORT = process.env.PORT || 3000;
app.listen(PORT,async()=>{
    await connectionToDB();
    console.log(`Server is Listen at http://localhost:${PORT}`)
})