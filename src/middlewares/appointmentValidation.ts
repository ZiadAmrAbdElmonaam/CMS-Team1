import { body } from "express-validator";

export const appointmentValidation = [
  body("doctorName")
    .isString()
    .withMessage("doctorName must be a string")
    .isLength({ min: 1 })
    .withMessage("doctorName must be at least 1 character long")
    .isLength({ max: 255 })
    .withMessage("doctorName must be at most 255 characters long"),

  body("patientName")
    .isString()
    .withMessage("patientName must be a string")
    .isLength({ min: 1 })
    .withMessage("patientName must be at least 1 character long")
    .isLength({ max: 255 })
    .withMessage("patientName must be at most 255 characters long"),

  body("date").optional().isDate().withMessage("date must be a date"),
];

export const updateAppointmentValidation = [
  body("doctorName")
    .optional()
    .isString()
    .withMessage("doctorName must be a string")
    .isLength({ min: 1 })
    .withMessage("doctorName must be at least 1 character long")
    .isLength({ max: 255 })
    .withMessage("doctorName must be at most 255 characters long"),

  body("patientName")
    .optional()
    .isString()
    .withMessage("patientName must be a string")
    .isLength({ min: 1 })
    .withMessage("patientName must be at least 1 character long")
    .isLength({ max: 255 })
    .withMessage("patientName must be at most 255 characters long"),
];
