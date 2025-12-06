import { pool } from "../../db/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

interface SignupInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: "customer" | "admin";
}

interface SigninInput {
  email: string;
  password: string;
}

export const signup = async ({ name, email, password, phone, role = "customer" }: SignupInput) => {
  const hashed = await bcrypt.hash(password, config.bcryptSalt);

  const result = await pool.query(
    `INSERT INTO users (name,email,password,phone,role)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id,name,email,phone,role`,
    [name, email.toLowerCase(), hashed, phone, role]
  );

  return result.rows[0];
};

export const signin = async ({ email, password }: SigninInput) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email.toLowerCase(),
  ]);

  const user = result.rows[0];

  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    config.jwtSecret,
    { expiresIn: config.jwtExpiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
