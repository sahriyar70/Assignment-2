import express from "express";
import * as controller from "./user.controller";
import { authenticate } from "../../common/middleware/auth.middleware";
import { authorize } from "../../common/middleware/role.middleware";

const router = express.Router();

router.get("/", authenticate, authorize("admin"), controller.getAllUsers);
router.put("/:userId", authenticate, controller.updateUser);
router.delete("/:userId", authenticate, authorize("admin"), controller.deleteUser);

export default router;
