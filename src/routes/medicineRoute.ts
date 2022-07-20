import express from 'express';
const router = express.Router();
import * as medicineController from '../controllers/medicineController';
import { body } from 'express-validator';
import validationMW from '../middlewares/validationMW';
import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/autherizationMW";

router
  .route('/medicine')
  .get(authMW, checkAutherizationMW(['admin']),medicineController.getAllMedicines)
  .post(authMW, checkAutherizationMW(['admin']),
    [
      body('title').isString().withMessage('medicine title must be  string'),
      body('price')
        .isNumeric()
        .withMessage('medicine price must be number'),
      body('description')
        .isString()
        .withMessage('medicine description must be string'),
    ],
    validationMW,
    medicineController.addNewMedicine
  )
  .put(authMW, checkAutherizationMW(['admin']),
    [
      body('title')
        .optional()
        .isString()
        .withMessage('medicine title must be string'),
      body('price')
        .optional()
        .isNumeric()
        .withMessage('medicine price must be number'),
      body('description')
        .optional()
        .isString()
        .withMessage('medicine description must be string'),
    ],
    validationMW,
    medicineController.updateMedicine
  );

router
  .route('/medicine/:id')
  .get(authMW, checkAutherizationMW(['admin']),medicineController.getMedicineById)
  .delete(authMW, checkAutherizationMW(['admin']),medicineController.deleteMedicine);

export default router;
