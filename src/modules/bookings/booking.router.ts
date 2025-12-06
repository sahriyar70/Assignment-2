import express from "express";
import * as controller from "./booking.controller";
import { authenticate } from "../../common/middleware/auth.middleware";

const router = express.Router();

router.post("/", authenticate, controller.createBooking);
router.get("/", authenticate, controller.getBookings);
router.put("/:bookingId", authenticate, controller.updateBooking);

export default router;

// import express from "express";

// const router = express.Router();

// // Temporary test route
// router.get("/", (req, res) => res.send("Booking test route"));

// export default router;
