import Employe from "../models/empolyee";
import { RequestHandler } from "express";
// const bcrypt = require('bcrypt');
import bcrypt from "bcrypt";
const salt = bcrypt.genSaltSync(10);

// let Admin = mongoose.model('Admin');

export const getAllEmploye: RequestHandler = (request, response, next) => {
  Employe.find({})
    .then((data: any) => {
      response.status(200).json(data);
    })
    .catch((error: any) => {
      next(error);
    });
};

export const getEmployeById: RequestHandler = (request, response, next) => {
  Employe.findOne({ _id: request.params.id })
    .then((data: any) => {
      if (data == null) {
        next(new Error("Employe not found"));
      } else {
        response.status(200).json(data);
      }
    })
    .catch((error: any) => {
      next(error);
    });
};

export const createEmploye: RequestHandler = (request, response, next) => {
  bcrypt.hash(
    (request.body as { password: string }).password,
    salt,
    function (err, hash) {
      let object = new Employe({
        _id: request.body.id,
        fullName: (request.body as { fullName: String }).fullName,
        email: (request.body as { email: String }).email,
        password: hash,
        address: (
          request.body as {
            address: { city: String; street: String; building: Number };
          }
        ).address,
        salary: (request.body as { salary: Number }).salary,
        mobile: (request.body as { mobile: Number }).mobile,
        role: (request.body as { role: String }).role,
      });
      object
        .save()
        .then((data: any) => {
          response
            .status(201)
            .json({ data: "Employe data added successfully" });
        })
        .catch((error: any) => next(error));
    }
  );
};

export const updateEmploye: RequestHandler =  (request,response,next) => {
 Employe.findOne({ _id: request.body.id })
  .then((data:any)=> {
    for (const key in request.body) {
      if (typeof request.body[key] == "object") {
        for (let item in request.body[key]) {
          data[key][item] = request.body[key][item];
        }
      } else data[key] = request.body[key];
    }

     data.save();

    response.status(200).json({ data: "Employe data updated" });
  }) .catch((error: any) => next(error));
};

export const deleteEmploye: RequestHandler = (request, response, next) => {
  Employe.deleteOne({ _id: request.params.id })
    .then((data: any) => {
      response.status(200).json(data);
    })
    .catch((error: any) => next(error));
};
