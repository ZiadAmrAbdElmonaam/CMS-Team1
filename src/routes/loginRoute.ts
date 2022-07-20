import express from 'express';
import * as controller from "../controllers/loginController";
const route: express.Router = express.Router();

route.post("/login-patient", controller.loginPatient);
route.post("/login-doctor", controller.loginDoctor);
route.post("/login-employee", controller.loginEmployee);
route.post("/login-admin", controller.loginAdmin);

export default route;