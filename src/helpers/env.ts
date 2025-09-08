import dotenv from "dotenv";

dotenv.config();

// Validasi sederhana agar tidak lupa set env
function requireEnv(key: keyof NodeJS.ProcessEnv): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required env variable: ${key}`);
  }
  return value;
}

export const ENV = {
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_REFRESH_SECRET: requireEnv("JWT_REFRESH_SECRET"),
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
