import mongoose, { Schema, Document, models, model } from 'mongoose';
import { OrganizationType } from './OrganizationType';

export interface IPost extends Document {
  postTitle: string;
  postContent: string;
  userName: string;
  org: string;
  orgType: OrganizationType;
  likes: number;
  views: number;
  comments: mongoose.Types.ObjectId[];
  emailHash: string;
  topic: string;
  subtopic: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    postTitle: { type: String, required: true },
    postContent: { type: String, required: true },
    userName: { type: String, required: true },
    org: { type: String, required: true },
    orgType: { type: String, enum: Object.values(OrganizationType), required: true },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    emailHash: { type: String, required: true },
    topic: { type: String, required: true },
    subtopic: { type: String, required: true },
  },
  { timestamps: true }
);

const Post = models.Post || model<IPost>('Post', PostSchema);
export default Post; 