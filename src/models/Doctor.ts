import { Schema, model } from "mongoose";
import mongoose from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);
//////////////INTERFACE//////////////////////////////////
export interface IDoctor {
  _id: Number;
  fullName: String;
  mobile: Number;
  email: String;
  password: String;
  address?: { city: String; street: String; building: Number };
  Appointment?: Array<Number>;
  role: String;
  salary?: Number;
}
////////////////////////////Doctor Scheama/////////////////
const doctorSchema = new Schema<IDoctor>(
  {
    _id: { type: Number },
    fullName: { type: String, required: true },
    mobile: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Appointment: {
      type: [{ type: Number }],
      ref: "appointments"
    },
    role: { type: String, default: 'doctor' },
    salary: { type: Number },
    address: { city: String, street: String, building: Number },
  },
  { id: false }
);
doctorSchema.plugin(AutoIncrement, { id: "doctor_id" });
const Doctor = model<IDoctor>("doctor", doctorSchema);
export default Doctor;
