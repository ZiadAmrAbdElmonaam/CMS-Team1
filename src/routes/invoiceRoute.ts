import express, { Router } from "express";
import { body, param } from "express-validator";
import * as controller from "../controllers/invoiceController";
import validationMW from "../middlewares/validationMW";
import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/autherizationMW";

const router: Router = express.Router();

router
  .route("/invoice")
  .get(authMW, checkAutherizationMW(["admin"]), controller.getAllInovice)

  .post(
    authMW,
    checkAutherizationMW(["admin", "employee"]),
    [
      body("patientId")
        .isNumeric()
        .withMessage("bill patientId should be number"),
      body("paymentMethod")
        .isIn(["cash", "credit card", "insurance"])
        .withMessage(
          "bill payment Method should be one of these ['cash','credit card','insurance']"
        ),
      body("data")
        .optional()
        .isDate()
        .withMessage("bill date should be at date format"),
      body("price").isNumeric().withMessage("bill price should be number"),
    ],
    validationMW,
    controller.createInvoice
  )
  .put(
    authMW,
    checkAutherizationMW(["admin"]),
    [
      body("id").isNumeric().withMessage("bill id should be number"),
      body("patientId")
        .optional()
        .isNumeric()
        .withMessage("bill patientId should be number"),
      body("paymentMethod")
        .optional()
        .isIn(["cash", "credit card", "insurance"])
        .withMessage(
          "bill payment Method should be one of these ['cash','credit card','insurance']"
        ),
      body("data")
        .optional()
        .isDate()
        .withMessage("bill date should be at date format"),
      body("price")
        .optional()
        .isNumeric()
        .withMessage("bill price should be number"),
    ],
    validationMW,
    controller.updateInvoice
  );

router
  .route("/bills/:id")
  .get(
    authMW,
    checkAutherizationMW(["admin", "patient-byId"]),
    [param("id").isNumeric().withMessage("bill id should be number")],
    validationMW,
    controller.getInvoiceById
  )
  .delete(
    authMW,
    checkAutherizationMW(["admin"]),
    [param("id").isNumeric().withMessage("bill id should be number")],
    validationMW,
    controller.deleteInvoiceById
  );

export default router;
