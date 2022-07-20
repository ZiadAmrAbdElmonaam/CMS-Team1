import express from "express";
import {
  getAllReport,
  createReport,
  updateReport,
  getReportById,
  deleteReport,
} from "./../controllers/reportController";
import validationMW from "./../middlewares/validationMW";
import {
  validationReport,
  validationUpdataReport,
} from "../middlewares/reportValidation";
import authMW from "../middlewares/authMW";
import autherizationMW from "../middlewares/autherizationMW";
const router = express.Router();

router
  .route("/report")
  .get(authMW, autherizationMW(["admin"]), validationMW, getAllReport)
  .post(
    authMW,
    autherizationMW(["admin", "employee"]),
    validationReport,
    validationMW,
    createReport
  )
  .put(
    authMW,
    autherizationMW(["admin", "employee"]),
    validationUpdataReport,
    validationMW,
    updateReport
  );
router
  .route("/report/:id")
  .get(
    authMW,
    autherizationMW(["admin", "employee"]),
    validationMW,
    getReportById
  )
  .delete(authMW, autherizationMW(["admin"]), deleteReport);
// module.exports = router;
export default router;
