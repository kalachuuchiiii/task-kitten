import dotenv from "dotenv";
dotenv.config({ quiet: true });

const required = [
  "PORT",
  "WEB_ORIGIN",
  "MONGO_URI",
  "JWT_KEY",
  "NODE_ENV",
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
  "REDIS_PASSWORD",
  "REDIS_PUBLIC_ENDPOINT",
  "REDIS_PORT",
  "PEPPER"
] as const;

type RequiredEnv = typeof required[number];

function getEnv(key: RequiredEnv): string {
  const value = process.env[key];
  if (!value) {
    console.error(`Missing environment variable: ${key}`);
    process.exit(1);
  }
  return value;
}

export const config = {
  PORT: getEnv("PORT"),
  WEB_ORIGIN: getEnv("WEB_ORIGIN"),
  MONGO_URI: getEnv("MONGO_URI"),
  JWT_KEY: getEnv("JWT_KEY"),
  NODE_ENV: getEnv('NODE_ENV'),
  SMTP_HOST: getEnv('SMTP_HOST'),
  SMTP_USER: getEnv('SMTP_USER'),
  SMTP_PASS: getEnv('SMTP_PASS'),
  REDIS_PASSWORD: getEnv('REDIS_PASSWORD'),
  REDIS_PUBLIC_ENDPOINT: getEnv('REDIS_PUBLIC_ENDPOINT'),
  REDIS_PORT: parseInt( getEnv('REDIS_PORT'), 10),
  PEPPER: getEnv('PEPPER')
} as const;
