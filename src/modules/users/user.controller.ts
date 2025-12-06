import { Request, Response, NextFunction } from "express";
import * as service from "./user.service";
import { AuthRequest } from "../../common/middleware/auth.middleware";

export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const users = await service.getAllUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await service.updateUser(req);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await service.deleteUser(req.params.userId as string);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
