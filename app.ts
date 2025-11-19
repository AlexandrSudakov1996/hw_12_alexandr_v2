import * as mongoose from "mongoose";
import {launchServer} from "./server.ts";


const db = "mongodb+srv://alexandrsudakov24_db_user:0Xq60wLM0HPsvzTp@cluster0.g4g7hon.mongodb.net/sample_mflix?appName=Cluster0"
mongoose.connect(db).then(() => {
    console.log("Connected to mongo");
    launchServer()
});

