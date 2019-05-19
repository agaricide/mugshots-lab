import "reflect-metadata";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import { MugshotModel } from "./models/Mugshot";
import { MugshotStream, Mugshot } from "mugshots-client";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

(async () => {
  const mugshotStream = await MugshotStream({ maxChunkSize: 25 });
  console.log("Stream created.");

  mugshotStream.on("error", error => {
    console.log(error);
  });

  mugshotStream.on("close", () => {
    console.log("Stream closed.");
  });

  mugshotStream.on("data", (mugshots: Mugshot[]) => {
    MugshotModel.insertMany(mugshots)
      .then(() => console.log("Chunk ingested."))
      .catch(error => {
        console.log(error);
      });
  });
})();
