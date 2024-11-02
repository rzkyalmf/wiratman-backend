import { Features, Hero, HomeDescription, IFeatures, IHero, IHomeDescription } from "../models/homepage.model";

const HomePageRepository = {
  // Hero Section
  getAllHero: async () => {
    return await Hero.find();
  },

  getHeroById: async (id: string) => {
    const hero = await Hero.findById(id);
    return hero;
  },

  createHero: async (heroData: IHero) => {
    const hero = new Hero(heroData);
    const newHero = await hero.save();

    return newHero;
  },

  updateHero: async (id: string, heroData: Partial<IHero>) => {
    return await Hero.findByIdAndUpdate(id, heroData, { new: true });
  },

  deleteHero: async (id: string) => {
    return await Hero.findByIdAndDelete(id);
  },

  // Home Description
  getAllHomeDescription: async () => {
    return await HomeDescription.find();
  },

  getHomeDescriptionById: async (id: string) => {
    const homeDescription = await HomeDescription.findById(id);
    return homeDescription;
  },

  createHomeDescription: async (data: IHomeDescription) => {
    const homeDescription = new HomeDescription(data);
    const newHomeDescription = await homeDescription.save();

    return newHomeDescription;
  },

  updateHomeDescription: async (id: string, data: Partial<IHomeDescription>) => {
    return await HomeDescription.findByIdAndUpdate(id, data, { new: true });
  },

  deleteHomeDescription: async (id: string) => {
    return await HomeDescription.findByIdAndDelete(id);
  },

  // Features
  getAllFeatures: async () => {
    return await Features.find();
  },

  getFeaturesById: async (id: string) => {
    const features = await Features.findById(id);
    return features;
  },

  createFeatures: async (data: IFeatures) => {
    const features = new Features(data);
    const newFeatures = await features.save();

    return newFeatures;
  },

  updateFeatures: async (id: string, data: Partial<IFeatures>) => {
    return await Features.findByIdAndUpdate(id, data, { new: true });
  },

  deleteFeatures: async (id: string) => {
    return await Features.findByIdAndDelete(id);
  },
};

export default HomePageRepository;
