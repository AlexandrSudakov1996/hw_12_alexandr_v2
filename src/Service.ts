import {movieModel} from "./Schemas.ts";
import {Request, Response} from "express"

export const AllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await movieModel.find().select("title -_id");
        res.json({ count: movies.length, movies });
    } catch (error) {
        res.status(500).json({ message: "Error while receiving files", error });
    }
};

export const RussianOnly = async (req: Request, res: Response) => {
    const movies = await movieModel
        .find({ languages: ["Russian"] })
        .select("title languages -_id");
    res.json({ count: movies.length, movies });
};

export const ActionComedy = async (_: Request, res: Response) => {
    const movies = await movieModel
        .find({ genres: { $all: ["Action", "Comedy"] } })
        .select("title genres plot -_id");
    res.json({ count: movies.length, movies });
};

export const Top = async (req: Request, res: Response) => {
    const movies = await movieModel
        .find({ "awards.wins": { $exists: true } })
        .sort({ "awards.wins": -1 })
        .limit(2)
        .select("title -_id");
    res.json({ count: movies.length, movies });
};

export const ImdbRotten = async (_: Request, res: Response) => {
    const movies = await movieModel.find({
        "imdb.rating": { $exists: true },
        "tomatoes.viewer.rating": { $exists: true },
        $expr: {
            $lt: ["$imdb.rating", "$tomatoes.viewer.rating"]
        }
    }).select("title imdb.rating tomatoes.viewer.rating -_id");

    res.json({ count: movies.length, movies });
};

export const Imdb2010 = async (_: Request, res: Response) => {
    const result = await movieModel.aggregate([
        {
            $match: {
                year: 2010,
                "imdb.rating": { $type: "number", $exists: true, $ne: null }
            }
        },
        {
            $group: {
                _id: "$imdb.rating",
                titles: { $push: { title: "$title", year: "$year" } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: -1 } }
    ]);

    res.json({ count: result.length, ratings: result });
};