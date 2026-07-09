import mongoose, { Schema, Document } from 'mongoose';

export interface IOffer extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  discountBadge: string;
  validityText: string;
  isActive: boolean;
}

const OfferSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  image: { type: String, required: true },
  discountBadge: { type: String, required: true },
  validityText: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.models.Offer || mongoose.model<IOffer>('Offer', OfferSchema);
