import express from "express";
import { body, param } from "express-validator";
import {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController";
import {
  appointmentValidation,
  updateAppointmentValidation,
} from "../middlewares/appointmentValidation";

import validationMW from "../middlewares/validationMW";
import authMW from "../middlewares/authMW";
import autherizationMW from "../middlewares/autherizationMW";

const router = express.Router();

router
  .route("/appointment")

  .get(authMW, autherizationMW(["admin"]), getAllAppointments)

  .post(
    authMW,
    autherizationMW(["admin", "employee", "doctor"]),
    validationMW,
    appointmentValidation,
    createAppointment
  )

  .put(
    authMW,
    autherizationMW(["admin", "employee"]),
    validationMW,
    updateAppointmentValidation,
    updateAppointment
  );

router
  .route("/appointment/:id")

  .get(
    authMW,
    autherizationMW(["admin", "employee", "doctor"]),
    [param("id").isNumeric().withMessage("Appointment id should be number")],
    validationMW,
    getAppointmentById
  )

  .delete(
    authMW,
    autherizationMW(["admin", "employee"]),
    [param("id").isNumeric().withMessage("Appointment id isn't valid id")],
    validationMW,
    deleteAppointment
  );

export default router;
