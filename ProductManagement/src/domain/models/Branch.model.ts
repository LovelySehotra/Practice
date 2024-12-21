import mongoose, { Document } from "mongoose";

export interface IBranch extends Document {
  name: string;
  pincode?: string;
  contact?: string;
}

const branchSchema = new mongoose.Schema<IBranch>({
  name: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: false,
  },
  contact: {
    type: String,
    required: false,
  },
});

export const Branch = mongoose.model<IBranch>("Branch", branchSchema);
