import express from 'express';
const router = express.Router();
import { body } from 'express-validator';

import * as clinicController from '../controllers/clinicController';
import validationMW from '../middlewares/validationMW';
import authMW from "../middlewares/authMW";
import checkAutherizationMW from "../middlewares/autherizationMW";

router
  .route('/clinic')
  .get(authMW, checkAutherizationMW(['admin']),clinicController.getAllClinics)
  .post(authMW, checkAutherizationMW(['admin']),
    [
      body('name').isString().withMessage('clinic name must be string'),
      body('mobile')
        .isNumeric()
        .withMessage('clinic number must be all numbers'),
      body('email').isEmail().withMessage('clinic email is not valid '),
      body('password')
        .isStrongPassword()
        .withMessage(
          'clinic password must contain (upper case & lower case) and should be at least 8 characters'
        ),
      body('address')
        .isObject()
        .withMessage(
          'clinic address must be an object  '
        ),
      body('address.city')
        .isString()
        .withMessage(' city must be string'),
      body('address.street')
        .isString()
        .withMessage(' street must be string'),
      body('address.building')
        .isNumeric()
        .withMessage(' building must be number'),
      body('medicine')
        .isArray()
        .withMessage('clinic medicines must be array of ids'),
    ],
    validationMW,
    clinicController.createNewClinic
  )
  .put(authMW, checkAutherizationMW(['admin']),
    [
      body('name')
        .optional()
        .isString()
        .withMessage('clinic name must be string'),
      body('mobile')
        .optional()
        .isNumeric()
        .withMessage('clinic mobile must be only numbers'),
      body('email').isEmail().withMessage('clinic email must be a valid email'),
      body('password')
        .optional()
        .isStrongPassword()
        .withMessage(
          'clinic password must contain (upper case & lower case) and should be at least 8 characters'
        ),
      body('address')
        .optional()
        .isObject()
        .withMessage(
          'clinic address must be an object'
        ),
      body('address.city')
        .optional()
        .isString()
        .withMessage('city must be string'),
      body('address.street')
        .optional()
        .isString()
        .withMessage('street must be string'),
      body('address.building')
        .optional()
        .isNumeric()
        .withMessage('building must be number'),
    ],
    validationMW,
    clinicController.updateClinic
  );

router
  .route('/clinic/:id')
  .get(authMW, checkAutherizationMW(['admin']),clinicController.getClinicById)
  .delete(authMW, checkAutherizationMW(['admin']),clinicController.deleteClinic);

export default router;
