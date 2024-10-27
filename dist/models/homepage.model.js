"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeAbout = exports.Hero = void 0;
const mongoose_1 = require("mongoose");
// Schema untuk Hero
const HeroSchema = new mongoose_1.Schema({
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
exports.Hero = (0, mongoose_1.model)("Hero", HeroSchema);
const HomeAboutUs = new mongoose_1.Schema({
    description: { type: String, required: true },
    feature1: { type: String, required: true },
    feature2: { type: String, required: true },
    feature3: { type: String, required: true },
    feature4: { type: String, required: true },
});
exports.HomeAbout = (0, mongoose_1.model)("HomeAboutUs", HomeAboutUs);
