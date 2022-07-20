import express from "express";
const router = express.Router();

import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/autherizationMW";
import { adminValidation, adminUpdateValidation } from "../middlewares/adminMW";
import validationMW from "./../middlewares/validationMW";
import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  getAdminById,
  deleteAdmin,
} from "./../controllers/adminContrloller";

router
  .route("/admin")
  .get(authMW, checkAutherizationMW(["admin"]), getAllAdmins)
  .post(adminValidation, createAdmin)
  .put(
    authMW,
    checkAutherizationMW(["admin"]),
    adminUpdateValidation,
    validationMW,
    updateAdmin
  );
router
  .route("/admin/:id")
  .get(authMW, checkAutherizationMW(["admin-byId"]), validationMW, getAdminById)
  .delete(authMW, checkAutherizationMW(["admin-byId"]), deleteAdmin);
export default router;
