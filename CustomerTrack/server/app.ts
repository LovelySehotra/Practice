import express from "express";
import cors from 'cors'
import customerRoutes from "./routes/customer.routes";
import membershipRoutes from "./routes/membership.routes"
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  //@ts-ignore
    origin: [process.env.FRONTEND], 
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization', // Allows all origins
    credentials: true
  }));
app.use("/api/v1/customer",customerRoutes);
app.use("/api/v1/membership",membershipRoutes);
export default app;