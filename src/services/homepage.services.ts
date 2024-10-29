import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import z from "zod";

import { IHero } from "../models/homepage.model";
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

const HomePageServices = {
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
};

export default HomePageServices;
