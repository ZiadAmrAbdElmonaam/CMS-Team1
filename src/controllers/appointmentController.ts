import { RequestHandler } from "express";
import appointment from "../models/appointment";

export const getAllAppointments: RequestHandler = (req, res, next) => {
  appointment
    .find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const getAppointmentById: RequestHandler = (req, res, next) => {
  appointment
    .findOne({ _id: req.params.id })
    .then((data) => {
      if (data == null) {
        next(new Error("Appointment not found"));
      } else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const createAppointment: RequestHandler = (req, res, next) => {
  let appointmentObj = new appointment({
    doctorName: (req.body as { doctorName: String }).doctorName,
    patientName: (req.body as { patientName: string }).patientName,
    date: (req.body as { date: Date }).date,
  });
  appointmentObj
    .save()
    .then(() => {
      res.status(201).json({ data: "Appointment Added Successfully" });
    })
    .catch((error) => next(error));
};

export const updateAppointment: RequestHandler = (req, res, next) => {
  appointment
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          doctorName: (req.body as { doctorName: String }).doctorName,
          patientName: (req.body as { patientName: string }).patientName,
          date: (req.body as { date: Date }).date,
        },
      },
      { new: true }
    )
    .then((data) => {
      if (data == null) {
        next(new Error("Appointment not found"));
      } else res.status(200).json(data);
    })
    .catch((error) => next(error));
};

export const deleteAppointment: RequestHandler = (req, res, next) => {
  appointment
    .deleteOne({ _id: req.params.id }, {})
    .then((data) => {
      if (data == null) {
        next(new Error("Appointment not found"));
      } else res.status(200).json({ data: "Appointment deleted successfully" });
    })
    .catch((error) => {
      next(error);
    });
};
