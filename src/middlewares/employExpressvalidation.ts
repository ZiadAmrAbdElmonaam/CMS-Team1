// const { body, param, query } = require("express-validator");
import { body } from "express-validator";
const check = require("express-validator").check;

export const validationArray = [
  body("fullName")
    .isAlpha()
    .withMessage("Employe fullName shoud be characters"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Employe Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"
    ),
  body("email")
    .isEmail()
    .withMessage("Employe email shoud be like example@email.com"),
  body("address").isObject().withMessage("address should be object"),
  check("address.city").isString().withMessage("city name should be string"),
  check("address.street")
    .isString()
    .withMessage("street name should be string"),
  check("address.building")
    .isNumeric()
    .withMessage("building number should be number"),
  body("mobile")
    .isMobilePhone("ar-EG")
    .withMessage("Employe mobile should be mobile numbers")
    .isLength({ min: 10, max: 14 })
    .withMessage("mobile length should be between 10 and 14  numbers"),
  body("salary").isNumeric().withMessage("Employe salary should be Number..!"),
  body("role")
    .optional()
    .isAlpha()
    .withMessage("Employe role shoud be characters"),
];

export const validationUpdataArray = [
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage("Employe fullName shoud be characters"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage(
      "Employe Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"
    ),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Employe email shoud be like example@email.com"),
  body("address").optional().isObject().withMessage("address should be object"),
  check("address.city")
    .optional()
    .isString()
    .withMessage("city name should be string"),
  check("address.street")
    .optional()
    .isString()
    .withMessage("street name should be string"),
  check("address.building")
    .optional()
    .isNumeric()
    .withMessage("building number should be number"),
  body("mobile")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("Employe mobile should be mobile numbers")
    .isLength({ min: 10, max: 14 })
    .withMessage("mobile length should be between 10 and 14  numbers"),
  body("role")
    .optional()
    .isAlpha()
    .withMessage("Employe role shoud be characters"),
];
