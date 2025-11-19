import express from "express";
import {
    ActionComedy,
    AllMovies,
    ImdbRotten,
    RussianOnly,
    Top,
    Imdb2010
} from "./Service.ts";



export const routers = express.Router();


routers.get("/", AllMovies);
routers.get("/imdb-rotten", ImdbRotten);
routers.get("/OnlyRussian", RussianOnly);
routers.get("/action-comedy", ActionComedy);
routers.get("/top-awards", Top);
routers.get("/imdb", Imdb2010);


