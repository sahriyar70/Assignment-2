import { Request, Response, NextFunction } from "express";
import * as service from "./vehicle.service";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getAll();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.getOne(req.params.vehicleId as string);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await service.update(req.params.vehicleId as string, req.body);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await service.remove(req.params.vehicleId as string);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
