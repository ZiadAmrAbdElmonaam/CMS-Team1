import { Schema, model, Types } from "mongoose";

export interface IAdmin {
  _id: Types.ObjectId;
  fullName: String;
  email: String;
  password: String;
  phoneNumber: Number;
  role: String;
}
//  Create admin schema
const adminSchema = new Schema<IAdmin>({
  _id: { type: Schema.Types.ObjectId, auto: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: {type:Number , length: 11},
  role: { type: String, default: "admin" },
});

const Admin = model<IAdmin>("Admin", adminSchema);
export default Admin;
