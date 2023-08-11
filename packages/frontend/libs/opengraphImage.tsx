/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import path from "path";
import satori from "satori";
import sharp from "sharp";
import { SITE_TITLE } from "./constants";
import { getSiteUrl } from "./utils";

export const writeOgpImage = async (title: string, slug: string = "base") => {
  const imagePath = path.join("public", "ogps");
  if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });

  const image = await generateOgpImage(title, slug);
  fs.writeFileSync(path.join(imagePath, `${slug}.png`), image);
};

const generateOgpImage = async (title: string, slug: string) => {
  const getFontPath = (name: string) => path.join("libs", "fonts", name);
  const fontMedium = fs.readFileSync(getFontPath("NotoSansJP-Regular.ttf"));
  const fontBold = fs.readFileSync(getFontPath("NotoSansJP-Bold.ttf"));

  // base : SITE_URL
  // !base: SITETITLE - SITE_URL
  const isBase = slug === "base";
  const url = `${!isBase ? SITE_TITLE + " - " : ""}${getSiteUrl(
    isBase ? undefined : slug
  )}`;

  const svg = await satori(
    <div
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(24, 24, 28, 1), rgba(12, 12, 16, 1))",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "90%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "90%",
            display: "flex",
            fontSize: "75px",
            borderRadius: "8px",
            backgroundColor: "#fff",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "#fff",
            fontWeight: 400,
            fontSize: 24,
          }}
        >
          {url}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontMedium,
          style: "normal",
          weight: 400,
        },
        {
          name: "Noto Sans JP",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
};
