import express from "express";
import { connectionToDB } from "@/infrastructure";
import { appRouter } from "@/interface/routers";
import errorHandler from "@/interface/middleware/error/error.middleware";
import { connectRedis } from "@/infrastructure/redis.config";
import "../application/services/Slack/SlackService"
import { UserModel } from "@/domain/SequelizeModel/User.sq";
import { db } from "@/domain/SequelizeModel";
import bodyParser from "body-parser"
import axios from "axios";
import cors from "cors"

const webhookUrl = '';
const botToken = '';
export type AppConfig = {
    port?: number | string;
}

export class Server {
    private app;
    private config: AppConfig;
    constructor(config: AppConfig) {
        this.config = config
        this.app = express();
        this.app.use(cors({
            origin:"*",
            credentials: true
        }))
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use("/api", appRouter);
        // Endpoint for Slack event subscription
        // this.app.post('/slack/events', async (req, res) => {
        //     const { type, challenge, event="app_mention" } = req.body;

        //     // Respond to the URL verification challenge
        //     if (type === 'url_verification') {
        //         console.log("hello")
        //         return res.status(200).send({ challenge });
        //     }

        //     // Handle the app_mention event
        //     if (event && event.type === 'app_mention') {
        //         console.log(`App was mentioned: ${event.text}`);

        //         // Respond using Incoming Webhook
        //         try {
        //             await axios.post(webhookUrl, {
        //                 text: `Hello <@${event.user}>! You mentioned me.`,
        //             });
        //         } catch (error) {
        //             console.error('Error sending message:', error);
        //         }
        //     }

        //     res.status(200).send(); // Acknowledge receipt of the event
        // });
        this.app.use(errorHandler)
    }
    start() {
        const port = this.config.port ?? 1209;
        connectionToDB()
        connectRedis();
        db.authenticate();
        db.sync({ force: false, alter: true })

        this.app.listen(port, () => {
            console.log("Yes i am working")
        })

    }
}