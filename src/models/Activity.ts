import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  slug: string;
  category: string;
  destination: string;
  duration: string;
  image: string;
  price: number;
  isOfferAvailable?: boolean;
  offerPrice?: number;
  isPopular?: boolean;
  shortDescription: string;
  description: string;
  highlights: string[];
  whatToBring: string[];
}

const ActivitySchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  isOfferAvailable: { type: Boolean, default: false },
  offerPrice: { type: Number },
  isPopular: { type: Boolean, default: false },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  highlights: [{ type: String }],
  whatToBring: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
