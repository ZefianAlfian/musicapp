import "dotenv/config";
import cheerio from "cheerio";
import fetch from "node-fetch";

const { BASE_URL } = process.env;
const baseURL = "http://flacless.com";

/**
 * searchMusic
 * @param {String} q query
 */
export default async function searchMusic(q: string) {
  q = q.trim().split(/ +/).join("+");
  const src = await fetch(`${baseURL}/search?q=${q}`);
  const $ = cheerio.load(await src.text());
  const arr: {
    id: string | undefined;
    title: string | undefined;
    unic_title: string | undefined;
    penyanyi: string | undefined;
    thumb: string | undefined;
  }[] = [];
  $("a.w-full").each(function () {
    const id = $(this)
      .attr("href")
      ?.trim()
      .replace(/[^0-9]/g, "");
    const title = $(this).find("div.card-title").text().trim();
    const unic_title = $(this).attr("href")?.replace(`/track/${id}/`, "");
    const penyanyi = $(this).find("p.card-body").text().trim();
    const thumb = `${BASE_URL}/getImg?id=${$(this)
      .find("img.lazy")
      .attr("data-src")
      ?.replace(`/image?id=`, "")}`;
    arr.push({ id, title, unic_title, penyanyi, thumb });
  });
  return arr;
}
