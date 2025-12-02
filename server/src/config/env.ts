import dotenv from "dotenv";
dotenv.config();

const required = [
  "PORT",
  "WEB_ORIGIN",
  "MONGO_URI",
  "JWT_KEY",
  "NODE_ENV"
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
  NODE_ENV: getEnv('NODE_ENV')
} as const;
