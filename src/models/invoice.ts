import mongoose, { Schema, Document, Date } from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = require("mongoose-sequence")(mongoose);

export interface IInvoice extends Document {
  _id: number;
  paymentMethod: string;
  patientId: number;
  date: Date;
  price: number;
}

const schema: Schema = new mongoose.Schema({
  _id: {
    type: Number,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "credit card", "insurance"],
    default: "credit card",
    required: true,
  },
  patientId: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
});

schema.plugin(AutoIncrement, { id: "invoice-id" });

export default mongoose.model<IInvoice>("invoice", schema);
