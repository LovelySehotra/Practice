import express from "express"
const app = express();
app.use(express.json());
app.use(cors({
    origin: [""] ,
    credential:true
}))

export default app;