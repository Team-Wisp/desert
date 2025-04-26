import mongoose, { Schema, Document, models, model } from 'mongoose';
import { OrganizationType } from './OrganizationType';

export interface IUser extends Document {
  email: string;
  password?: string | null;   
  domain: string;
  organization: string;
  orgType: OrganizationType;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },  
    domain: { type: String, required: true },
    organization: { type: String, required: true },
    orgType: { type: String, enum: Object.values(OrganizationType), required: true },
    isVerified: { type: Boolean, default: false },
    lastLoginAt: { type: Date, default: Date.now },
  },
  { timestamps: true } // createdAt and updatedAt auto-managed
);

const User = models.User || model<IUser>('User', UserSchema);
export default User;
