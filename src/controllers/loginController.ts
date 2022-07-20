import { RequestHandler } from "express";
import Patient from "../models/patient";
import Doctor from "../models/Doctor";
import Employe from "../models/empolyee";
import Admin from "../models/admin";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ICustomError } from "../app";

export const loginPatient: RequestHandler = (request, response, next) => {
  Patient.findOne(
    { email: (request.body as { email: string }).email },
    { password: 1, role: 1 }
  )
    .then((patientData: any) => {
      if (!patientData) {
        let error: ICustomError = new Error(
          "Patient Email Or Password Is Incorrect"
        );
        error.status = 401;
        throw error;
      } else {
        bcrypt
          .compare(
            (request.body as { password: string }).password,
            patientData.password
          )
          .then(function (result: boolean): void {
            if (result == true) {
              let token = jwt.sign(
                {
                  id: patientData._id,
                  role: patientData.role,
                },
                process.env.secret_Key as string,
                { expiresIn: "7d" }
              );

              response.status(200).json({ token, message: "Login Patient" });
             }
          });
      }
    })
    .catch((error: Error) => next(error));
};

export const loginDoctor: RequestHandler = (request, response, next) => {
  Doctor.findOne(
    { email: (request.body as { email: string }).email },
    { password: 1, role: 1 }
  )
    .then((doctorData: any) => {
      if (!doctorData) {
        let error: ICustomError = new Error(
          "Doctor Email Or Password Is Incorrect"
        );
        error.status = 401;
        throw error;
      } else {
        bcrypt
          .compare(
            (request.body as { password: string }).password,
            doctorData.password
          )
          .then(function (result: boolean): void {
            if (result == true) {
              let token = jwt.sign(
                {
                  id: doctorData._id,
                  role: doctorData.role,
                },
                process.env.secret_Key as string,
                { expiresIn: "7d" }
              );

              response.status(200).json({ token, message: "Login Doctor" });
            }
          });
      }
    })
    .catch((error: Error) => next(error));
};

export const loginEmployee: RequestHandler = (request, response, next) => {
  Employe.findOne(
    { email: (request.body as { email: string }).email },
    { password: 1, role: 1 }
  )
    .then((employeData: any) => {
      if (!employeData) {
        let error: ICustomError = new Error(
          "Employe Email Or Password Is Incorrect"
        );
        error.status = 401;
        throw error;
      } else {
        bcrypt
          .compare(
            (request.body as { password: string }).password,
            employeData.password
          )
          .then(function (result: boolean): void {
            if (result == true) {
              let token = jwt.sign(
                {
                  id: employeData._id,
                  role: employeData.role,
                },
                process.env.secret_Key as string,
                { expiresIn: "7d" }
              );

              response.status(200).json({ token, message: "Login Employee" });
            } 
          });
      }
    })
    .catch((error: Error) => next(error));
};

export const loginAdmin: RequestHandler = (request, response, next) => {
  Admin.findOne(
    { email: (request.body as { email: string }).email },
    { password: 1, role: 1 }
  )
    .then((adminData: any) => {
      if (!adminData) {
        let error: ICustomError = new Error(
          "Admin Email Or Password Is Incorrect"
        );
        error.status = 401;
        throw error;
      } else {
        bcrypt
          .compare(
            (request.body as { password: string }).password,
            adminData.password
          )
          .then(function (result: boolean): void {
            if (result == true) {
              let token = jwt.sign(
                {
                  id: adminData._id,
                  role: adminData.role,
                },
                process.env.secret_Key as string,
                { expiresIn: "7d" }
              );

              response.status(200).json({ token, message: "Login Admin" });
            }
          });
      }
    })
    .catch((error: Error) => next(error));
};
