import mongoose, { Schema, model, connect } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

interface Iclinic {
  _id: number;
  name: string;
  mobile: string;
  email: string;
  password: string;
  address: {
    city: string;
    street: string;
    building: number;
  };
  doctors: number[];
  medicine: number[];
  employees: number[];
  report: number[];
}

const clinicSchema = new Schema<Iclinic>({
  _id: Number,
  name: { type: String, required: true },
  mobile: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  address: {
    city: String,
    street: String,
    building: Number,
  },
  medicine: {
    type: [Number],
    ref: "medicines",
  },
});

clinicSchema.plugin(AutoIncrement, { id: "clinicSchema" });
export default mongoose.model<Iclinic>("clinics", clinicSchema);
