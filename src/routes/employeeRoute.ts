const { body, param } = require("express-validator");
import express from "express";
const router = express.Router();
import validationMW from "../middlewares/validationMW";
import {
  getAllEmploye,
  createEmploye,
  updateEmploye,
  getEmployeById,
  deleteEmploye,
} from "../controllers/employeeController";
import {
  validationArray,
  validationUpdataArray,
} from "../middlewares/employExpressvalidation";
import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/autherizationMW";

router
  .route("/employee")
  .get(authMW, checkAutherizationMW(["admin"]), getAllEmploye)
  .post(
    authMW,
    checkAutherizationMW(["admin"]),
    validationArray,
    validationMW,
    createEmploye
  )
  .put(
    authMW,
    checkAutherizationMW(["admin"]),
    validationUpdataArray,
    validationMW,
    updateEmploye
  );
router
  .route("/employee/:id")
  .get(
    authMW,
    checkAutherizationMW(["admin", "employee-byId"]),
    validationMW,
    getEmployeById
  )
  .delete(
    authMW,
    checkAutherizationMW(["admin", "employee-byId"]),
    deleteEmploye
  );
// module.exports = router;
export default router;
