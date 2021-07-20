import "dotenv/config";
import fetch from "node-fetch";
import cheerio from "cheerio";
import QueryString from "qs";
import path from "path";
import downloadFile from "./downloadFile";

export default async function (id: string, unic_title: string) {
  const src = await fetch(`http://flacless.com/track/${id}/${unic_title}`);
  const $ = cheerio.load(await src.text());
  const tempArr: {
    quality: string | undefined;
    file: QueryString.ParsedQs;
  }[] = [];
  const arr: {}[] = [];
  $("#download")
    .find("a.card-btn")
    .each(function () {
      let quality = $(this)
        .text()
        .trim()
        .replace(/[\t|\n]/g, "")
        .toLowerCase()
        .split(/ +/)
        .join("_");
      if (quality == "flac_🔥") {
        quality = "flac";
      }
      let file = $(this).attr("href")?.replace("/file?", "");

      if (!file) return; // + mastiin kalau filenya ga bisa undefined
      // `file` disini typenya di "narrow" menjadi `string`, bukan `string | undefined`
      const parsed = QueryString.parse(file);
      tempArr.push({ quality, file: parsed });
    });
  for (const i in tempArr) {
    let { file, quality: quality2 } = tempArr[i];
    let { id, md5, quality, media } = file;
    let urlDownload = `https://flacless.com/file?md5=${md5}&id=${id}&media=${media}&quality=${quality}`;
    const src = await fetch(urlDownload);
    const resJSON = await src.json();
    urlDownload = `https://e-cdns-proxy-${resJSON.cdn}.dzcdn.net/mobile/1/${resJSON.hash}`;
    arr.push({
      id,
      unic_title,
      download: urlDownload,
      md5,
      quality: quality2,
      media,
    });
  }
  return arr;
}
