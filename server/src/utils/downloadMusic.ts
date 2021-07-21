import "dotenv/config";
import fetch from "node-fetch";
import { Quality, DownloadOptions, FileMeta, Media } from "../interfaces";

const getDownloadMusic = async (id: string, options?: DownloadOptions) => {
  // default options
  const { quality }: DownloadOptions = {
    quality: Quality.HIGH,
    ...options,
  };

  // scrape html for meta data
  const pageResponse = await fetch(`https://flacless.com/track/${id}/_`);
  const pageContent = await pageResponse.text();

  const rawMeta = pageContent.match(/const _DZR_ = (.*)<\/script>/)?.[1];
  if (!rawMeta) throw new Error("Failed to download");

  const metaData = JSON.parse(rawMeta);
  const {
    MD5_ORIGIN: md5,
    MEDIA_VERSION: media,
    SNG_TITLE: title,
    ART_NAME: artist,
    MEDIA,
  } = metaData;

  // get file meta data
  const query = { md5, id, quality: quality.toString(), media };
  const queryString = new URLSearchParams(query).toString();

  const fileMetaResponse = await fetch(
    `https://flacless.com/file?${queryString}`
  );
  const { cdn, hash }: FileMeta = await fileMetaResponse.json();
  const isiMedia: Media[] = MEDIA;
  const [{ HREF: preview }] = isiMedia;
  return {
    title,
    artist,
    quality: quality.toString(),
    preview,
    download: `https://e-cdns-proxy-${cdn}.dzcdn.net/mobile/1/${hash}`,
  };
};

export default getDownloadMusic;
