import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import downloadFile from "./utils/downloadFile";
import searchMusic from "./utils/searchMusic";
import downloadMusic from "./utils/downloadMusic";
import "./interfaces";
import { DownloadOptions, Quality } from "./interfaces";

const app = express();
const { PORT } = process.env;
const baseURL = "http://flacless.com";

app.set("json spaces", 2);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/../public")));

app.get("/downloadMusic", async (req, res) => {
  try {
    const id = req.query.id;
    const qualityInput = req.query.quality;

    if (!id) {
      return res.status(403).json({ message: "input query id" });
    }
    if (!qualityInput) {
      return res.status(403).json({ message: "input query quality" });
    }
    let quality =
      qualityInput == "low"
        ? Quality.LOW
        : qualityInput == "high"
        ? Quality.HIGH
        : qualityInput == "flac"
        ? Quality.FLAC
        : Quality.LOW;
    let arr = await downloadMusic(id as string, { quality });
    res.status(200).json(arr);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
    console.log(err);
  }
});

app.get("/getImg", async (req, res) => {
  try {
    const id = req.query.id;
    const filePath = path.join(
      __dirname + `/../public/${Math.random().toString(36).substring(7)}.webp`
    );
    if (!id) {
      return res.status(403).json({ message: "input query id" });
    }
    downloadFile(`${baseURL}/image?id=${id}`, filePath).then(() => {
      res.contentType("image/webp");
      res.status(200).sendFile(filePath);
      setTimeout(() => {
        fs.unlinkSync(filePath);
      }, 10 * 60000);
    });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
    console.log(err);
  }
});

app.get("/search-music", async (req, res) => {
  try {
    const data = await searchMusic(req.query.q as string);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening in port : ${PORT}`);
});
