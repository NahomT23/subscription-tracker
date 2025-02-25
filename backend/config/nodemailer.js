import nodemailer from "nodemailer"
import { configDotenv } from 'dotenv';
configDotenv()

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD
const ACCOUNT_EMAIL = process.env.ACCOUNT_EMAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: ACCOUNT_EMAIL,
        pass: EMAIL_PASSWORD
    }
})

export default transporter