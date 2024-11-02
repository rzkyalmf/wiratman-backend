import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import z from "zod";

import { IFeatures, IHero, IHomeDescription } from "../models/homepage.model";
import HomePageRepository from "../repositories/homepage.repository";

const CreateHeroSchema = z.object({
  title: z.string().min(3, { message: "Title Wajib diisi" }),
  buttonUrl: z.string().url({ message: "URL tidak valid" }),
  image: z.object({
    filename: z.string(),
    originalName: z.string(),
    path: z.string(),
    size: z.number(),
    mimetype: z.string(),
  }),
});

const CreateHomeDescriptionSchema = z.object({
  title: z.string().min(3, { message: "Title Wajib diisi" }),
  description: z.string().min(3, { message: "Description Wajib diisi" }),
});

const CreateFeaturesSchema = z.object({
  title: z.string().min(3, { message: "Title Wajib diisi" }),
});

const HomePageServices = {
  // Hero Section
  getAllHero: async () => {
    return await HomePageRepository.getAllHero();
  },

  getHeroById: async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: "error",
        message: "Format ID tidak valid",
      };
    }

    const hero = await HomePageRepository.getHeroById(id);

    if (!hero) {
      return {
        status: "error",
        message: "Hero tidak ditemukan",
      };
    }

    return {
      status: "success",
      data: hero,
    };
  },

  createHero: async (heroData: IHero) => {
    const dataValidated = CreateHeroSchema.safeParse(heroData);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
        message: dataValidated.error.issues[0].message,
      };
    }

    const newHero = await HomePageRepository.createHero(dataValidated.data);

    return { newHero, dataValidated };
  },

  updateHero: async (id: string, heroData: Partial<IHero>) => {
    const dataValidated = CreateHeroSchema.safeParse(heroData);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
      };
    }

    return await HomePageRepository.updateHero(id, heroData);
  },

  deleteHero: async (id: string) => {
    const data = await HomePageRepository.deleteHero(id);

    if (data?.image && data.image.path) {
      try {
        // Hapus file gambar
        const imagePath = path.join(__dirname, "../../", data.image.path);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (error) {
        console.error("Error deleting image file:", error);
      }
    }

    return data;
  },

  // Home Description
  getAllHomeDescription: async () => {
    return await HomePageRepository.getAllHomeDescription();
  },

  getHomeDescriptionById: async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: "error",
        message: "Format ID tidak valid",
      };
    }

    const data = await HomePageRepository.getHomeDescriptionById(id);

    if (!data) {
      return {
        status: "error",
        message: "Home Description tidak ditemukan",
      };
    }

    return {
      status: "success",
      data: data,
    };
  },

  createHomeDescription: async (data: IHomeDescription) => {
    const dataValidated = CreateHomeDescriptionSchema.safeParse(data);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
        message: dataValidated.error.issues[0].message,
      };
    }

    const newHomeDescription = await HomePageRepository.createHomeDescription(dataValidated.data);

    return { newHomeDescription, dataValidated };
  },

  updateHomeDescription: async (id: string, data: Partial<IHomeDescription>) => {
    const dataValidated = CreateHomeDescriptionSchema.safeParse(data);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
      };
    }

    return await HomePageRepository.updateHomeDescription(id, data);
  },

  deleteHomeDescription: async (id: string) => {
    const data = await HomePageRepository.deleteHomeDescription(id);
    return data;
  },

  // Features
  getAllFeatures: async () => {
    return await HomePageRepository.getAllFeatures();
  },

  getFeaturesById: async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        status: "error",
        message: "Format ID tidak valid",
      };
    }

    const data = await HomePageRepository.getFeaturesById(id);

    if (!data) {
      return {
        status: "error",
        message: "Feature tidak ditemukan",
      };
    }

    return {
      status: "success",
      data: data,
    };
  },

  createFeatures: async (data: IFeatures) => {
    const dataValidated = CreateFeaturesSchema.safeParse(data);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
        message: dataValidated.error.issues[0].message,
      };
    }

    const newFeatures = await HomePageRepository.createFeatures(dataValidated.data);

    return { newFeatures, dataValidated };
  },

  updateFeatures: async (id: string, data: Partial<IFeatures>) => {
    const dataValidated = CreateFeaturesSchema.safeParse(data);

    if (!dataValidated.success) {
      return {
        status: "error",
        errors: dataValidated.error?.flatten().fieldErrors,
      };
    }

    return await HomePageRepository.updateFeatures(id, data);
  },

  deleteFeatures: async (id: string) => {
    const data = await HomePageRepository.deleteFeatures(id);
    return data;
  },
};

export default HomePageServices;
