// const { body, param, query } = require("express-validator");
import { body } from "express-validator";
// const check = require('express-validator').check;

export const validationReport = [
  body("invoiceReport")
    .isString()
    .withMessage("invoiceReport must be a string")
    .isLength({ min: 1 })
    .withMessage("invoiceReport must be at least 1 character long")
    .isLength({ max: 255 })
    .withMessage("invoiceReport must be at most 255 characters long"),

  body("appointmentReport")
    .isString()
    .withMessage("appointmentReport must be a string")
    .isLength({ min: 1 })
    .withMessage("appointmentReport must be at least 1 character long")
    .isLength({ max: 255 })
    .withMessage("appointmentReport must be at most 255 characters long"),
];

export const validationUpdataReport = [
  body("invoiceReport")
    .optional()
    .isString()
    .withMessage("invoiceReport must be a string")
    .isLength({ min: 1 })
    .withMessage("invoiceReport must be at least 1 character long")
    .isLength({ max: 255 })
    .withMessage("invoiceReport must be at most 255 characters long"),

  body("appointmentReport")
    .optional()
    .isString()
    .withMessage("appointmentReport must be a string")
    .isLength({ min: 1 })
    .withMessage("appointmentReport must be at least 1 character long")
    .isLength({ max: 255 })
    .withMessage("appointmentReport must be at most 255 characters long"),
];
