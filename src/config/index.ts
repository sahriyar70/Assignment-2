import dotenv from "dotenv";
dotenv.config();

export default {
  port: Number(process.env.PORT) || 5000,

  jwtSecret: process.env.JWT_SECRET || "secret123",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
  bcryptSalt: Number(process.env.BCRYPT_SALT_ROUNDS) || 10,
};