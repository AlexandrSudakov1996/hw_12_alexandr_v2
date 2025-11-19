import express from "express";
import morgan from "morgan";
import {routers} from "./Routers.ts";


export const launchServer = () => {
    const app = express();
    app.listen(3010, () => {
        console.log("Server started on port 3010");
    })

    app.use(express.json());

    app.use(morgan("dev"))

    app.use("/movies", routers);

}