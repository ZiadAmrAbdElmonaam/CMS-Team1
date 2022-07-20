const { body, param } = require("express-validator");
const check = require("express-validator").check;

export const patientValidation = [
  body("fullName").isString().withMessage(" full name should be string"),
  body("email").isEmail().withMessage(" email should be like name@email.com"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "patient Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"
    ),
  body("phoneNumber")
    .isMobilePhone("ar-EG")
    .withMessage(" phone number should be mobile numbers")
    .isLength({ min: 11, max: 11 })
    .withMessage(" phone number length should be 11 numbers"),

  body("address")
    .optional()
    .isObject()
    .withMessage("patient address should be object"),
  check("address.city")
    .optional()
    .isString()
    .withMessage("patient city name should be string"),
  check("address.street")
    .optional()
    .isString()
    .withMessage("patient street name should be string"),
  check("address.building")
    .optional()
    .isNumeric()
    .withMessage("patient building number should be number"),
  body("appointments")
    .optional()
    .isArray()
    .withMessage(
      "patient appointments should be array patient appointments id"
    ),

  body("payment")
    .optional()
    .isObject()
    .withMessage("patient payment should be object"),
  check("payment.cardType")
    .optional()
    .isIn(["visa", "mastercard", "meza"])
    .withMessage(
      "patient credit card type should be one of these ['visa','mastercard','meza']"
    ),
  check("payment.cardNumber")
    .optional()
    .isNumeric()
    .withMessage("patient credit card number should be number")
    .isLength({ min: 16, max: 16 })
    .withMessage("patient credit card number length should be 16 numbers"),

  body("potions")
    .optional()
    .isArray()
    .withMessage("patient potions should be array objects"),
  check("potions.*.medicineId")
    .optional()
    .isNumeric()
    .withMessage("patient potions medicine Id should be number"),

  check("potions.*.usageDescription")
    .optional()
    .isString()
    .withMessage("patient potions usageDescription should be string"),

  body("bills")
    .optional()
    .isArray()
    .withMessage("patient bills should be array patient bill id"),

  body("role")
    .optional()
    .isString()
    .withMessage("patient role should be characters"),
];

export const patientUpdateValidation = [
  body("id").isNumeric().withMessage("patient id should be number"),
  body("fullName")
    .optional()
    .isString()
    .withMessage("patient full name should be string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("patient email should be like name@email.com"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage(
      "patient Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"
    ),
  body("phoneNumber")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage("patient phone Number should be mobile numbers")
    .isLength({ min: 11, max: 11 })
    .withMessage("patient mobile length should be 11 numbers"),

  body("address")
    .optional()
    .isObject()
    .withMessage("patient address should be object"),
  check("address.city")
    .optional()
    .isString()
    .withMessage("patient city name should be string"),
  check("address.street")
    .optional()
    .isString()
    .withMessage("patient street name should be string"),
  check("address.building")
    .optional()
    .isNumeric()
    .withMessage("patient building number should be number"),
  body("appointments")
    .optional()
    .isArray()
    .withMessage(
      "patient appointments should be array patient appointments id"
    ),

  body("payment")
    .optional()
    .isObject()
    .withMessage("patient payment should be object"),
  check("payment.cardType")
    .optional()
    .isIn(["visa", "mastercard", "meza"])
    .withMessage(
      "patient credit card type should be one of these ['visa','mastercard','meza']"
    ),
  check("payment.cardNumber")
    .optional()
    .isNumeric()
    .withMessage("patient credit card number should be number")
    .isLength({ min: 16, max: 16 })
    .withMessage("patient credit card number length should be 16 numbers"),

  body("potions")
    .optional()
    .isArray()
    .withMessage("patient potions should be array objects"),
  check("potions.*.medicineId")
    .optional()
    .isNumeric()
    .withMessage("patient potions medicine Id should be number"),
  check("potions.*.usageDescription")
    .optional()
    .isString()
    .withMessage("patient potions usageDescription should be string"),

  body("bills")
    .optional()
    .isArray()
    .withMessage("patient bills should be array patient bill id"),
  body("role")
    .optional()
    .isString()
    .withMessage("patient role should be characters"),
];

export const patientParamsValidation = [
  param("id").isNumeric().withMessage("patient id should be number"),
];
export const patientDelValidation = [
  param("id").isNumeric().withMessage("patient id should be numbers"),
  body("appointments")
    .isArray()
    .withMessage("patient appointments should be array appointments id"),
];

export const patientBillsDelValidation = [
  param("id").isNumeric().withMessage("patient id should be numbers"),
  body("bills")
    .isArray()
    .withMessage("patient bills should be array patient bill id"),
];
