declare namespace NodeJS {
  interface ProcessEnv {
    FRONTEND_URL: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    NODE_ENV?: "development" | "production" | "test";
  }
}
