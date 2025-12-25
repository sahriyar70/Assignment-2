import express from "express";

import path from "path";
import authRouter from "./modules/auth/auth.router";
import userRouter from "./modules/users/user.router";
import vehicleRouter from "./modules/vehicles/vehicle.router";
//  import bookingRouter from "./modules/bookings/booking.router";
import { errorHandler } from "./common/middleware/error.middleware";

const app = express();
app.get("/", (_req, res) => res.send("Server iss up"));

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));




app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/vehicles", vehicleRouter);
//  app.use("/api/v1/bookings", bookingRouter);


app.use(errorHandler);

export default app;