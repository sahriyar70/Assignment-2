import express from "express";
import * as controller from "./vehicle.controller";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";

const router = express.Router();

router.post("/", authenticate, authorize("admin"), controller.create);
router.get("/", controller.getAll);
router.get("/:vehicleId", controller.getOne);
router.put("/:vehicleId", authenticate, authorize("admin"), controller.update);
router.delete("/:vehicleId", authenticate, authorize("admin"), controller.remove);

export default router;
