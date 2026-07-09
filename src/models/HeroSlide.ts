import mongoose, { Schema, Document } from 'mongoose';

export interface IHeroSlide extends Document {
  url: string;
  title: string;
  description: string;
  tagline: string;
  order: number;
}

const HeroSlideSchema: Schema = new Schema({
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tagline: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.HeroSlide || mongoose.model<IHeroSlide>('HeroSlide', HeroSlideSchema);
