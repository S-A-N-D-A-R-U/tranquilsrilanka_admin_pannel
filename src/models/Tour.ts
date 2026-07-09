import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
  type: 'round' | 'day';
  title: string;
  slug: string;
  image: string;
  gallery?: string[];
  duration: string;
  destinations: string[];
  categories: string[];
  price: number;
  originalPrice?: number;
  linkedOffers?: any[];
  isOfferAvailable?: boolean;
  offerPercentage?: number;
  rating: number;
  reviews: number;
  isPopular?: boolean;
  overview: string;
  highlights: string[];
  itinerary: { day: string; title: string; description: string }[];
  inclusions: string[];
  exclusions: string[];
}

const TourSchema: Schema = new Schema({
  type: { type: String, enum: ['round', 'day'], required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  gallery: [{ type: String }],
  duration: { type: String, required: true },
  destinations: [{ type: String }],
  categories: [{ type: String }],
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  linkedOffers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }],
  isOfferAvailable: { type: Boolean, default: false },
  offerPercentage: { type: Number },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  isPopular: { type: Boolean, default: false },
  overview: { type: String, required: true },
  highlights: [{ type: String }],
  itinerary: [{
    day: { type: String },
    title: { type: String },
    description: { type: String }
  }],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema);
