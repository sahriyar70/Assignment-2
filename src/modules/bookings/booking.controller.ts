import { AuthRequest } from "../../common/middleware/auth.middleware";
import { Request, Response, NextFunction } from "express";
import * as service from "./booking.service";

export const createBooking = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await service.createBooking(req.user!.id, req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await service.getBookings(req.user!);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateBooking = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const data = await service.updateBooking(req.user!, req.params.bookingId as string);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
