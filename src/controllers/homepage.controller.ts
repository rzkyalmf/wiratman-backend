import { Request, Response } from "express";
import fs from "fs";

import HomePageServices from "../services/homepage.services";

const HomePageController = {
  handleGetAllHero: async (_: Request, res: Response) => {
    const heroes = await HomePageServices.getAllHero();

    res.status(200).json(heroes);
    return;
  },

  handleGetHeroById: async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await HomePageServices.getHeroById(id);

    if (data.status === "error") {
      res.status(404).json({ message: data.message });
      return;
    }

    res.status(200).json(data);
    return;
  },

  handleCreateHero: async (req: Request, res: Response) => {
    const heroData = req.body;
    const file = req.file;

    if (!file) {
      res.json({ error: "Cover image is required" });
      return;
    }

    heroData.image = {
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    };

    const createdHero = await HomePageServices.createHero(heroData);

    if (createdHero.errors) {
      fs.unlink(file.path, () => {
        "File not deleted";
      });
      res.status(403).json({
        message: createdHero.errors,
      });
      return;
    }

    res
      .status(201)
      .json({ data: createdHero, message: "Hero created successfully" });
    return;
  },

  handleUpdateHero: async (req: Request, res: Response) => {
    const { id } = req.params;
    const heroData = req.body;
    const file = req.file;

    if (!file) {
      res.json({ error: "Cover image is required" });
      return;
    }

    heroData.image = {
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    };

    const updatedHero = await HomePageServices.updateHero(id, heroData);

    if (updatedHero?.errors) {
      fs.unlink(file.path, () => {
        "File not deleted";
      });
      res.status(403).json({ message: updatedHero.errors });
      return;
    }

    res
      .status(200)
      .json({ data: updatedHero, message: "Hero updated successfully" });
    return;
  },

  handleDeleteHero: async (req: Request, res: Response) => {
    const { id } = req.params;
    await HomePageServices.deleteHero(id);

    res.status(200).json({ message: "Hero deleted successfully" });
    return;
  },
};

export default HomePageController;
