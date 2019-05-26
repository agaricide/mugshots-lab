import "reflect-metadata";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import { MugshotModel } from "../models/Mugshot";
import { MugshotStream, Mugshot } from "../../../../mugshots-client/dist";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

(async () => {

})();
