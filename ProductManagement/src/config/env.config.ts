import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../../.env") })
export const {
    PORT,
    DATABASE_URL,
    JWT_SECRET,
    STRIPE_SECRET,
    PAYMENT_SUCCESS_REDIRECT,
    PAYMENT_CANCEL_REDIRECT,
    SECRET_KEY_2FA,
    BOT_TOKEN
} = process.env