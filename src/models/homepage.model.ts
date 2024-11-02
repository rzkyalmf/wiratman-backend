import { model, Schema } from "mongoose";

// Schema untuk Hero Section
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

// Schema untuk Home Description
export interface IHomeDescription {
  title: string;
  description: string;
}

const HomeDescriptionSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

export const HomeDescription = model<IHomeDescription>("HomeDescription", HomeDescriptionSchema);

// Schema untuk Features
export interface IFeatures {
  title: string;
}

const FeaturesSchema: Schema = new Schema({
  title: { type: String, required: true },
});

export const Features = model<IFeatures>("Features", FeaturesSchema);
