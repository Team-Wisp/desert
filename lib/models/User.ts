import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  emailHash: string;
  password: string;
  org: string;
  orgType: string;
  userName?: string;
  posts: mongoose.Types.ObjectId[];
  likedPosts: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  emailHash: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  org: { type: String, required: true },
  orgType: { type: String, required: true },
  userName: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
  likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
});

const User = models.User || model<IUser>('User', UserSchema);
export default User; 