import { Request, Response, NextFunction } from "express";
import * as service from "./auth.service";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await service.signup(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.signin(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
