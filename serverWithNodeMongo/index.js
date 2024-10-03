import app from "./app.js";
import dbconnect from "./config/db.js";

app.listen(3000,async()=>{
    await dbconnect();
    console.log("server is listen http://localhost:3000")
})