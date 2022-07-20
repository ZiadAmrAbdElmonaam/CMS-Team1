import express, { Router } from "express";
import { check } from "express-validator";
import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/autherizationMW";
import validationMW from "../middlewares/validationMW";
import * as controller from "../controllers/patientController";
import {
  patientValidation,
  patientUpdateValidation,
  patientParamsValidation,
  patientDelValidation,
  patientBillsDelValidation,
} from "./../middlewares/patientMW";

const router: Router = express.Router();

router
  .route("/patient")
  .get(authMW, checkAutherizationMW(["admin"]), controller.getAllPatients)

  .post(
    patientValidation,
    authMW,
    checkAutherizationMW(["admin", "employee"]),
    validationMW,
    controller.createPatient
  )
  .put(
    authMW,
    checkAutherizationMW(["admin", "employee"]),
    validationMW,
    controller.updatePatient
  );

router
  .route("/patient/:id")
  .get(
    authMW,
    checkAutherizationMW(["admin", "employee", "patient-byId"]),
    patientParamsValidation,
    validationMW,
    controller.getPatientById
  )
  .put(
    authMW,
    checkAutherizationMW(["admin", "employee", "patient-byId"]),
    patientUpdateValidation,
    validationMW,
    controller.updatePatientProfile
  )
  .delete(
    authMW,
    checkAutherizationMW(["admin", "employee", "patient"]),
    patientParamsValidation,
    validationMW,
    controller.deletePatientById
  );

router
  .route("/patient/:id/appointments")
  .get(
    authMW,
    checkAutherizationMW(["admin", "employee", "patient-byId"]),
    patientParamsValidation,
    validationMW,
    controller.getPatientAppointmentsByPatientId
  )
  .delete(
    authMW,
    checkAutherizationMW(["admin", "employee", "patient-byId"]),
    patientDelValidation,
    validationMW,
    controller.deletePatientAppointmentsByPatientId
  );

router
  .route("/patient/:id/bills")
  .get(
    authMW,
    checkAutherizationMW(["admin", "employee", "patient-byId"]),
    patientParamsValidation,
    validationMW,
    controller.getPatientBillsByPatientId
  )
  .delete(
    authMW,
    checkAutherizationMW(["admin", "employee", "patient-byId"]),
    patientBillsDelValidation,
    validationMW,
    controller.deletePatientBillsByPatientId
  );

export default router;
