import mongoose, { Schema, model } from "mongoose";
const AutoIncrement = require("mongoose-sequence")(mongoose);

export interface Report {
  _id: Number;
  invoiceReport: String;
  appointmentReport: String;
}

const reportSchema = new Schema<Report>(
  {
    _id: Number,
    invoiceReport: { type: String, required: true },
    appointmentReport: { type: String, required: true },
  },
  { timestamps: true }
);
reportSchema.plugin(AutoIncrement, {
  id: "report_id_counter",
  inc_field: "_id",
});
reportSchema.plugin(AutoIncrement, { id: "Report" });
const Report = model<Report>("Report", reportSchema);

export default Report;
