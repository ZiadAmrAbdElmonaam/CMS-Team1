import Admin from "../models/admin";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
const bcryptSalt = bcrypt.genSaltSync(10);

export const getAllAdmins: RequestHandler = (req, res, next) => {
  Admin.find({})
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((error: any) => {
      next(error);
    });
};

export const getAdminById: RequestHandler = (req, res, next) => {
  Admin.findOne({ _id: req.params.id })
    .then((data: any) => {
      if (data == null) {
        next(new Error("Admin not found !"));
      } else {
        res.status(200).json(data);
      }
    })
    .catch((error: any) => {
      next(error);
    });
};

export const createAdmin: RequestHandler = (req, res, next) => {
  // encript pass using bcript
  bcrypt.hash(
    (req.body as { password: string }).password,
    bcryptSalt,
    function (erro, hash) {
      let adminObj = new Admin({
        _id: (req.body as { id: Types.ObjectId }).id,
        fullName: (req.body as { fullName: String }).fullName,
        email: (req.body as { email: String }).email,
        password: hash,
        phoneNumber: (req.body as { phoneNumber: Number }).phoneNumber,
        role: (req.body as { role: String }).role,
      });
      adminObj
        .save()
        .then((data: any) => {
          res.status(201).json({ data: "admin added" });
          console.log("admin data => ", data);
        })
        .catch((error: any) => next(error));
    }
  );
};

export const updateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const data: any = await Admin.findOne({ _id: req.body.id });
    for (const key in req.body) {
      if (typeof req.body[key] == "object") {
        for (let item in req.body[key]) {
          data[key][item] = req.body[key][item];
        }
      } else data[key] = req.body[key];
    }

    await data.save();

    res.status(200).json({ data: " Admin Data Updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin: RequestHandler = (req, res, next) => {
  Admin.deleteOne({ _id: req.params.id }, {})
    .then((data: any) => {
      res.status(200).json(data);
    })
    .catch((error: any) => next(error));
};
