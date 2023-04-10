import Redis from "ioredis";

const REDIS_CONFIG =
  process.env.NODE_ENV === "development"
    ? {}
    : {
        port: parseInt(process.env.REDIS_PORT), // Redis port
        host: process.env.REDIS_HOST, // Redis host
        username: process.env.REDIS_USERNAME, // needs Redis >= 6
        password: process.env.REDIS_PASSWORD,
        db: 0, // Defaults to 0
      };

export const redis = new Redis(REDIS_CONFIG);
