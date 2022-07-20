import express, { Express, Request, Response, NextFunction } from "express";
import mongoose, { Error } from "mongoose";
import bcrypt from "bcrypt";

import Clinic from "../models/clinic";

export const getAllClinics = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  
  Clinic.find({})
    .populate({ path: "medicine", select: "title description price" })
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const createNewClinic = function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  bcrypt.hash(request.body.password, 10, function (err, hash) {
    let clinic = new Clinic({
      name: request.body.name,
      mobile: request.body.mobile,
      email: request.body.email,
      password: hash,
      "address.city": request.body.address.city,
      "address.street": request.body.address.street,
      "address.building": request.body.address.building,
      medicine: request.body.medicine,
    });
    clinic
      .save()
      .then((data) => {
        response.status(201).json({ data: "clinic added" + data });
      })
      .catch((error) => next(error));
  });
};

export const updateClinic =  ( request: Request, response: Response, next: NextFunction) => {
  Clinic.findOne({ _id: request.body.id })
  .then( (data:any)=>{

    for (let key in request.body) {
     
      if (request.body[key].constructor.name == "Array") {
        for (let item in request.body[key]) {
          data[key].push(request.body[key][item]);
        }
      } else data[key] = request.body[key];
    }

     data.save();

    response.status(200).json({ data: "clinic Updated " + data });
  })
   .catch((error:any) => next(error)) 
 
};

export const getClinicById = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Clinic.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error("clinic not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const deleteClinic = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Clinic.findByIdAndDelete({ _id: request.params.id })

    .then((data) => {
      if (data == null) next(new Error(" clinic is important so you can`t delete it ..."));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};


