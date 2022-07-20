import express, { Express, Request, Response, NextFunction } from "express";
import mongoose, { Error } from "mongoose";
import Medicine from "../models/medicine";

export const getAllMedicines = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Medicine.find({})
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const addNewMedicine = function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  let medicine = new Medicine({
    title: request.body.title,
    price: request.body.price,
    description: request.body.description,
  });
  medicine
    .save()
    .then((data) => {
      response.status(201).json({ data: "added" + data });
    })
    .catch((error) => next(error));
};

export const updateMedicine =  (request: Request, response: Response,next: NextFunction) => {
  Medicine.findOne({ _id: request.body.id })
  .then((data:any) => {

    for (let key in request.body) {
      if (request.body[key].constructor.name == "Array") {
        for (let item in request.body[key]) {
          data[key].push(request.body[key][item]);
        }
      } else data[key] = request.body[key];
    }

     data.save();

    response.status(200).json({ data: "medicine Updated" + data });
  })
   .catch ((error:any) => next(error))
  
};

export const getMedicineById = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Medicine.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) next(new Error("medicine not found"));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const deleteMedicine = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  Medicine.findByIdAndDelete({ _id: request.params.id })

    .then((data) => {
      if (data == null) next(new Error("medicine is important so you can`t delete it ..."));
      response.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
