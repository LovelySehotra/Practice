import { WebClient } from "@slack/web-api";
import {
    BOT_TOKEN
  } from "@/config";
// Your Slack bot token (OAuth token)
const token = BOT_TOKEN;

// Initialize Slack client
const web = new WebClient(token);

// (async () => {
//   try {
//     const result = await web.chat.postMessage({
//       channel: 'C086VDCA4P2', 
//       text: 'Hello, Slack!',
//     });
//     console.log('Message sent: ', result.ts);
//   } catch (error) {
//     console.error('Error posting message: ', error);
//   }
// })();
