import { Hero, IHero } from "../models/homepage.model";

const HomePageRepository = {
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
};

export default HomePageRepository;
