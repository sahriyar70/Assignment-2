
import dotenv from "dotenv";
dotenv.config();

export interface Config {
  port: number;
  jwtSecret: string;
  jwtExpiresIn: string;
  bcryptSalt: number;
  dbUrl: string; 
}

const config: Config = {
  port: Number(process.env.PORT) || 5000,
  jwtSecret: process.env.JWT_SECRET || "secret123",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  bcryptSalt: Number(process.env.BCRYPT_SALT) || 10,
  dbUrl:process.env.DATABASE_URL!
};

export default config;
