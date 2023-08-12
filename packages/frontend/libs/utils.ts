import { SITE_TITLE } from "./constants";

export const getSiteUrl = (slug?: string) =>
  process.env.NEXT_PUBLIC_SITE_URL + (!!slug ? "posts/" + slug + "/" : "");

export const getSiteTitle = (title?: string) =>
  (!!title ? title + "｜" : "") + SITE_TITLE;

export const bodyToDescription = (body: string, length: number = 45) => {
  const textBody = body.replace(/<([^'">]|"[^"]*"|'[^']*')*>/g, "");
  if (textBody.length < length) {
    return textBody;
  }
  return textBody.substring(0, length) + "…";
};
