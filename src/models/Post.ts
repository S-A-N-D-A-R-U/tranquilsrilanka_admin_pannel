import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  readTime: string;
  isFeatured: boolean;
  isHtml: boolean;
  externalLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  readTime: { type: String, required: true },
  isFeatured: { type: Boolean, default: false },
  isHtml: { type: Boolean, default: false },
  externalLink: { type: String },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
