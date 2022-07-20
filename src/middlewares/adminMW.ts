const { body } = require("express-validator");
const check = require("express-validator").check;

export const adminValidation = [
  body("fullName").isAlpha().withMessage("full Name shoud be characters"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "admin Password shoud be at least 8 characters, with upper case , lower case, special character and numbers"
    ),
  body("email").isEmail().withMessage("email shoud be like name@email.com"),
  body("phoneNumber")
    .isMobilePhone("ar-EG")
    .withMessage("phone Number should be phone Number numbers ")
    .isLength({ min: 11, max: 11 })
    .withMessage("phone Number length should be 11 numbers"),
  body("role")
    .optional()
    .isAlpha()
    .withMessage("admin role shoud be characters"),
];

export const adminUpdateValidation = [
  body("fullName")
    .optional()
    .isAlpha()
    .withMessage(" full Name shoud be characters"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage(
      " Password shoud be at least 8 characters, with upper case,lower case, special character and numbers"
    ),
  body("email")
    .optional()
    .isEmail()
    .withMessage(" email shoud be like name@email.com"),
  body("phoneNumber")
    .optional()
    .isMobilePhone("ar-EG")
    .withMessage(" phone Number should be  numbers")
    .isLength({ min: 11, max: 11 })
    .withMessage("phone Number length should be between 11  numbers"),
  body("role")
    .optional()
    .isAlpha()
    .withMessage("admin role shoud be characters"),
];
