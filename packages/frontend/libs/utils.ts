import { SITE_TITLE } from "./constants";

export const getSiteUrl = (slug?: string) =>
  process.env.NEXT_PUBLIC_SITE_URL + (!!slug ? "posts/" + slug + "/" : "");

export const getSiteTitle = (title?: string) =>
  (!!title ? title + "｜" : "") + SITE_TITLE;
