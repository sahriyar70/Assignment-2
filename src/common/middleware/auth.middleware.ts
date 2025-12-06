import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as any;
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
