"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Features = exports.HomeDescription = exports.Hero = void 0;
const mongoose_1 = require("mongoose");
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
const HomeDescriptionSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
});
exports.HomeDescription = (0, mongoose_1.model)("HomeDescription", HomeDescriptionSchema);
const FeaturesSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
});
exports.Features = (0, mongoose_1.model)("Features", FeaturesSchema);
