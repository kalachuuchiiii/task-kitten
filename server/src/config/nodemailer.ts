
import nodemailer from 'nodemailer';
import { config } from './env';


export const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: 587,
    secure: false,
    auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASS
    }
})