import mongoose, { Schema, model, Document } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

export interface IPatient extends Document {
  _id: Number;
  fullName: String;
  email: String;
  password: String;
  phoneNumber: Number;
  address?: IAddress;
  appointments?: Array<Number>;
  potions?: IPotions;
  payment?: IPayment;
  bills?: Array<Number>;
  role: String;
}

interface IAddress extends Document {
  city: String;
  street: String;
  building: Number;
}

interface IPayment extends Document {
  cardType: String;
  cardNumber: Number;
}

interface IPotions extends Document {
  medicineId: Number;
  usageDescription: String;
}

const addressSchema: Schema = new mongoose.Schema<IAddress>({
  _id: { required: false },
  city: {
    type: String,
  },
  street: {
    type: String,
  },
  building: {
    type: Number,
  },
});

const paymentSchema: Schema = new mongoose.Schema<IPayment>({
  _id: { required: false },
  cardType: {
    type: String,
    enum: ["visa", "meza", "mastercard"],
    default: "visa",
  },
  cardNumber: {
    type: Number,
    unique: true,
  },
});

const potionsSchema: Schema = new mongoose.Schema<IPotions>({
  _id: { required: false },
  medicineId: {
    type: Number,
  },
  usageDescription: {
    type: String,
  },
});

const schema: Schema = new mongoose.Schema<IPatient>({
  _id: {
    type: Number,
  },
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: addressSchema,
  },
  bills: {
    type: [{ type: Number }],
    ref: "bills",
  },
  appointments: {
    type: [{ type: Number }],
    ref: "appointments",
  },
  payment: {
    type: paymentSchema,
  },
  potions: {
    type: [{ type: potionsSchema }],
  },
  role: {
    type: String,
    required: true,
    default: "patient",
  },
});
//@ts-ignore
schema.plugin(AutoIncrement, { id: "patient-id" });

export default mongoose.model<IPatient>("patients", schema);
