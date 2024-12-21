import express from "express";
import { connectionToDB } from "@/infrastructure";
import { appRouter } from "@/interface/routers";
import errorHandler from "@/interface/middleware/error/error.middleware";

export type AppConfig={
    port?:number |string;
}

export class Server{
    private app;
    private config:AppConfig;
    constructor (config:AppConfig){
        this.config = config
        this.app = express();
        this.app.use(express.json());
        this.app.use("/api",appRouter);
        this.app.use(errorHandler)
    }
    start(){
        const port = this.config.port ?? 1209;
        connectionToDB()
        this.app.listen(port,()=>{
            console.log("Yes i am working")
        })

    }
}