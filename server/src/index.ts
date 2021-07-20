import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";
import downloadFile from "./utils/downloadFile";
import searchMusic from "./utils/searchMusic";
import downloadMusic from "./utils/downloadMusic";

const app = express();
const { PORT } = process.env;
const baseURL = "http://flacless.com";

app.set("json spaces", 2);
app.use(express.static(path.join(__dirname, "/../public")));

app.get("/downloadMusic", async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res.status(403).json({ message: "input query id" });
    }

    let arr = await downloadMusic(id as string);
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
      }, 10 * 1000);
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
