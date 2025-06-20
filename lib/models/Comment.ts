import mongoose, { Schema, Document, models, model } from 'mongoose';
import { OrganizationType } from './OrganizationType';

export interface IComment extends Document {
  post: mongoose.Types.ObjectId;
  userName: string;
  org: string;
  orgType: OrganizationType;
  emailHash: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    userName: { type: String, required: true },
    org: { type: String, required: true },
    orgType: { type: String, enum: Object.values(OrganizationType), required: true },
    emailHash: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = models.Comment || model<IComment>('Comment', CommentSchema);
export default Comment; 