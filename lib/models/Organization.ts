// /lib/models/Organization.ts

import mongoose, { Schema, Document, models, model } from 'mongoose';
import { OrganizationType } from './OrganizationType';

export interface IOrganization extends Document {
  name: string;
  domain: string;
  type: OrganizationType;
  org_slug: string;
  logoUrl?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrganizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
    type: { type: String, enum: Object.values(OrganizationType), required: true },
    org_slug: { type: String, required: true, unique: true }, // NEW
    logoUrl: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Organization = models.Organization || model<IOrganization>('Organization', OrganizationSchema);
export default Organization;
