import { RequestHandler } from "express";
import Patient from "../models/patient";
import bcrypt from "bcrypt";

const bcryptSalt: string = bcrypt.genSaltSync(
  Number(process.env.saltRounds as string)
);

export const getAllPatients: RequestHandler = (req, res, next) => {
  Patient.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const createPatient: RequestHandler = (req, res, next) => {
  bcrypt.hash(
    (req.body as { password: string }).password,
    Number(bcryptSalt),
    function (err, hash) {
      let object = new Patient({
        fullName: (req.body as { fullName: string }).fullName,
        email: (req.body as { email: string }).email,
        password: hash,
        phoneNumber: (req.body as { phoneNumber: Number }).phoneNumber,
        address: (
          req.body as {
            address: { city: String; street: String; building: Number };
          }
        ).address,
        appointments: (req.body as { appointments: Array<Number> })
          .appointments,
        potions: (
          req.body as {
            potions: Array<{ medicineId: Number; usageDescription: String }>;
          }
        ).potions,
        payment: (
          req.body as { payment: { cardType: String; cardNumber: Number } }
        ).payment,
        bills: (req.body as { bills: Array<Number> }).bills,
        role: (req.body as { role: string }).role,
      });
      object
        .save()
        .then(() => {
          res.status(201).json({ data: "Patient Added " });
        })
        .catch((error) => next(error));
    }
  );
};

export const updatePatient: RequestHandler = async (req, res, next) => {
  try {
    let data: any = await Patient.findOne({
      _id: (req.body as { id: number }).id,
    });

    for (let key in req.body) {
      if (key === "password") {
        next(new Error(" you cann't change password"));
      } else {
        //  to check if key is object
        if (req.body[key].constructor.name == "Object") {
          for (let item in req.body[key]) {
            data[key][item] = req.body[key][item];
          }
        }

        // to check if key is array
        else if (req.body[key].constructor.name == "Array") {
          for (let item in req.body[key]) {
            data[key].push(req.body[key][item]);
          }
        } else {
          data[key] = req.body[key];
        }
      }
    }

    await data.save();
    res.status(200).json({ data: "Patient data updated" });
  } catch (error) {
    next(error);
  }
};

export const updatePatientProfile: RequestHandler = async (req, res, next) => {
  try {
    let data: any = await Patient.findOne({ _id: req.params.id });

    for (let key in req.body) {
      if (key === "password") {
        next(new Error(" you cann't change password"));
      } else {
        if (req.body[key].constructor.name == "Object") {
          for (let item in req.body[key]) {
            data[key][item] = req.body[key][item];
          }
        } else if (req.body[key].constructor.name == "Array") {
          for (let item in req.body[key]) {
            data[key].push(req.body[key][item]);
          }
        } else {
          data[key] = req.body[key];
        }
      }
    }

    await data.save();
    res.status(200).json({ data: "Patient data updated " });
  } catch (error) {
    next(error);
  }
};

export const getPatientById: RequestHandler = (req, res, next) => {
  Patient.find({ _id: req.params.id })
    .then((data) => {
      if (data == null) {
        next(new Error("Patient not found"));
      } else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const deletePatientById: RequestHandler = (req, res, next) => {
  Patient.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (data == null) {
        next(new Error("Patient not found"));
      } else res.status(200).json({ data: "Patient deleted" });
    })
    .catch((error) => {
      next(error);
    });
};

export const getPatientBillsByPatientId: RequestHandler = (req, res, next) => {
  Patient.find({ _id: req.params.id }, { _id: 0, bills: 1 })
    .populate("bills")
    .then((data) => {
      if (data == null) {
        next(new Error("Patient bill not found"));
      } else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const deletePatientBillsByPatientId: RequestHandler = (
  req,
  res,
  next
) => {
  Patient.updateOne({ _id: req.params.id })
    .then((data) => {
      if (data == null) {
        next(new Error("Patient bill not found"));
      } else {
        res.status(200).json({ data: "Patient bill removed " });
      }
    })
    .catch((error) => {
      next(error);
    });
};

export const getPatientAppointmentsByPatientId: RequestHandler = (
  req,
  res,
  next
) => {
  Patient.find({ _id: req.params.id }, { _id: 0, appointments: 1 })
    .populate({ path: "appointments", select: "-_id" })
    .then((data) => {
      if (data == null) {
        next(new Error("Patient appointments not found"));
      } else res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

export const deletePatientAppointmentsByPatientId: RequestHandler = (
  req,
  res,
  next
) => {
  Patient.updateOne({ _id: req.params.id })
    .then((data) => {
      if (data == null) {
        next(new Error("Patient Appointment not found"));
      } else {
        res.status(200).json({ data: "Patient Appointment removed" });
      }
    })
    .catch((error) => {
      next(error);
    });
};
