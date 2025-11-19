import mongoose, { Schema, model } from 'mongoose';

const movieSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number },
    languages: { type: [String] },
    genres: { type: [String] },
    ratings: {
        imdb: { type: Number },
        rotten_tomatoes: { type: Number },
    },
    awards: {
        wins: { type: Number },
        nominations: { type: Number },
        text: { type: String },
    },
});

export const movieModel = model('sample_mflix', movieSchema, 'movies');