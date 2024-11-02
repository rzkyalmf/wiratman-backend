import { Request, Response } from "express";
import fs from "fs";

import HomePageServices from "../services/homepage.services";

const HomePageController = {
  // Hero Section
  handleGetAllHero: async (_: Request, res: Response) => {
    const heroes = await HomePageServices.getAllHero();

    res.status(200).json({ data: heroes });
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
      res.status(403).json({ message: "Cover image is required" });
      return;
    }

    heroData.image = {
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    };

    const data = await HomePageServices.createHero(heroData);

    if (data.status === "error") {
      fs.unlink(file.path, () => {
        "File not deleted";
      });
      res.status(403).json({
        message: data.message,
      });
      return;
    }

    res.status(201).json({
      message: "Hero created successfully",
      // data: data.newHero,
      status: "success",
    });
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

    res.status(200).json({
      // data: updatedHero,
      message: "Hero updated successfully",
      status: "success",
    });
    return;
  },

  handleDeleteHero: async (req: Request, res: Response) => {
    const { id } = req.params;
    await HomePageServices.deleteHero(id);

    res.status(200).json({ message: "Hero deleted successfully" });
    return;
  },

  // Home Description
  handleGetAllHomeDescription: async (_: Request, res: Response) => {
    const data = await HomePageServices.getAllHomeDescription();

    res.status(200).json({ data });
    return;
  },

  handleGetHomeDescriptionById: async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await HomePageServices.getHomeDescriptionById(id);

    if (data.status === "error") {
      res.status(404).json({ message: data.message });
      return;
    }

    res.status(200).json(data);
    return;
  },

  handleCreateHomeDescription: async (req: Request, res: Response) => {
    const getData = req.body;

    const data = await HomePageServices.createHomeDescription(getData);

    if (data.status === "error") {
      res.status(403).json({
        message: data.message,
      });
      return;
    }

    res.status(201).json({
      message: "Home Description created successfully",
      status: "success",
    });
    return;
  },

  handleUpdateHomeDescription: async (req: Request, res: Response) => {
    const { id } = req.params;
    const getData = req.body;

    const updatedHomeDescription = await HomePageServices.updateHomeDescription(id, getData);

    if (updatedHomeDescription?.errors) {
      res.status(403).json({ message: updatedHomeDescription.errors });
      return;
    }

    res.status(200).json({
      message: "Home Description updated successfully",
      status: "success",
    });
    return;
  },

  handleDeleteHomeDescription: async (req: Request, res: Response) => {
    const { id } = req.params;
    await HomePageServices.deleteHomeDescription(id);

    res.status(200).json({ message: "Home Description deleted successfully" });
    return;
  },

  // Features
  handleGetAllFeatures: async (_: Request, res: Response) => {
    const data = await HomePageServices.getAllFeatures();

    res.status(200).json({ data });
    return;
  },

  handleGetFeaturesById: async (req: Request, res: Response) => {
    const { id } = req.params;

    const data = await HomePageServices.getFeaturesById(id);

    if (data.status === "error") {
      res.status(404).json({ message: data.message });
      return;
    }

    res.status(200).json(data);
    return;
  },

  handleCreateFeatures: async (req: Request, res: Response) => {
    const getData = req.body;

    const data = await HomePageServices.createFeatures(getData);

    if (data.status === "error") {
      res.status(403).json({
        message: data.message,
      });
      return;
    }

    res.status(201).json({
      message: "Features created successfully",
      status: "success",
    });
    return;
  },

  handleUpdateFeatures: async (req: Request, res: Response) => {
    const { id } = req.params;
    const getData = req.body;

    const updatedFeatures = await HomePageServices.updateFeatures(id, getData);

    if (updatedFeatures?.errors) {
      res.status(403).json({ message: updatedFeatures.errors });
      return;
    }

    res.status(200).json({
      message: "Features updated successfully",
      status: "success",
    });
    return;
  },

  handleDeleteFeatures: async (req: Request, res: Response) => {
    const { id } = req.params;
    await HomePageServices.deleteFeatures(id);

    res.status(200).json({ message: "Features deleted successfully" });
    return;
  },
};

export default HomePageController;
