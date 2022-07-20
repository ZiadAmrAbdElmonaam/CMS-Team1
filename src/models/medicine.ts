import mongoose, { Schema, model, connect } from "mongoose";

import Inc from "mongoose-sequence";
const AutoIncrement = require("mongoose-sequence")(mongoose);

interface Imedicine {
  _id: number;
  title: string;
  price: number;
  description: string;
}

const medicineSchema = new Schema<Imedicine>({
  _id: Number,
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

medicineSchema.plugin(AutoIncrement, { id: "medicineCounter" });

export default model<Imedicine>("medicines", medicineSchema);
