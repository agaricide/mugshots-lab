import "reflect-metadata";
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import { CountyModel } from "../models/County";
import { CountyIterable } from "../../../../mugshots-client";
import * as puppeteer from "puppeteer";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const counties = await CountyIterable(page);
  for await (const county of counties) {
    console.log(county);
    CountyModel.create(county);
    await sleep(2000);
  }
})();