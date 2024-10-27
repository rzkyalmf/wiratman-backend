import { model, Schema } from "mongoose";

export interface IHero {
  title: string;
  buttonUrl: string;
  image: {
    filename: string;
    originalName: string;
    path: string;
    size: number;
    mimetype: string;
  };
}

// Schema untuk Hero
const HeroSchema: Schema = new Schema({
  title: { type: String, required: true },
  buttonUrl: { type: String, required: true },
  image: {
    filename: String,
    originalName: String,
    path: String,
    size: Number,
    mimetype: String,
  },
});

export const Hero = model<IHero>("Hero", HeroSchema);

// Schema untuk About Us
export interface IHomeAboutUs {
  description: string;
  feature1: string;
  feature2: string;
  feature3: string;
  feature4: string;
}

const HomeAboutUs: Schema = new Schema({
  description: { type: String, required: true },
  feature1: { type: String, required: true },
  feature2: { type: String, required: true },
  feature3: { type: String, required: true },
  feature4: { type: String, required: true },
});

export const HomeAbout = model<IHomeAboutUs>("HomeAboutUs", HomeAboutUs);
