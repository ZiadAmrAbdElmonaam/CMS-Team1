import { RequestHandler } from "express";
import Doctor from "../models/Doctor";
import bcrypt from "bcrypt";
const salt: string = bcrypt.genSaltSync(10);
export const getAllDoctors: RequestHandler = (
  req: any,
  res: any,
  next: any
) => {
  Doctor.find({})
    .populate("Appointment")
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((error: any) => {
      next(error);
    });
};

export const getDoctorById: RequestHandler = (
  req: any,
  res: any,
  next: any
) => {
  Doctor.findOne({ _id: req.params.id })
    .populate("Appointment")
    .then((data: any) => {
      if (data == null) {
        next(new Error("Doctor not found"));
      } else res.status(200).json(data);
    })
    .catch((error: any) => {
      next(error);
    });
};

export const createDoctor: RequestHandler = (req: any, res: any, next: any) => {
  bcrypt.hash(
    (req.body as { password: string }).password,
    salt,
    function (err: any, hash: any) {
      let doctorObject = new Doctor({
        fullName: (req.body as { fullName: string }).fullName,
        mobile: (req.body as { mobile: Number }).mobile,
        password: hash,
        email: (req.body as { email: string }).email,
        Appointment: (req.body as { Appointment: Array<Number> }).Appointment,
        role: (req.body as { role: string }).role,
        salary: (req.body as { salary: Number }).salary,
        address: (
          req.body as {
            address: { city: String; street: String; building: Number };
          }
        ).address,
      });
      doctorObject
        .save()
        .then(() => {
          res.status(201).json({ data: "Doctor is  Added " });
        })
        .catch((error: any) => next(error));
    }
  );
};

export const updateDoctor: RequestHandler = (req: any, res: any, next: any) => {
  Doctor.findOne({ _id: req.body._id })
    .then((data: any) => {
      for (const key in req.body) {
        if (typeof req.body[key] == "object") {
          for (let item in req.body[key]) {
            data[key][item] = req.body[key][item];
          }
        } else data[key] = req.body[key];
      }

      data.save();

      res.status(200).json({ data: "Doctor data is updated" });
    })

    .catch((error: any) => next(error));
};

export const deleteDoctor: RequestHandler = (req: any, res: any, next: any) => {
  Doctor.deleteOne({ _id: req.params.id }, {})
    .then((data: any) => {
      if (data == null) {
        next(new Error("Doctor is not found"));
      } else res.status(200).json({ data: "Doctor deleted successfully" });
    })
    .catch((error: any) => {
      next(error);
    });
};

export const deleteDoctorAppointmentById: RequestHandler = (
  req: any,
  res: any,
  next: any
) => {
  Doctor.updateOne(
    { _id: req.params.id },
    { $pull: { Appointment: { $in: req.body.Appointment } } }
  )
    .then((data: any) => {
      if (data == null) {
        next(new Error("Appointment is not found"));
      } else {
        res.status(200).json({ data: "Appointment deleted " });
      }
    })
    .catch((error) => {
      next(error);
    });
};
