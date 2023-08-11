/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import path from "path";
import satori from "satori";
import sharp from "sharp";
import { SITE_TITLE } from "./constants";

export const writeOgpImage = async (title: string, slug: string) => {
  const imagePath = path.join("public", "ogps");
  if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });

  const image = await generateOgpImage(title);
  fs.writeFileSync(path.join(imagePath, `${slug}.png`), image);
};

const generateOgpImage = async (title: string) => {
  const getFontPath = (name: string) => path.join("libs", "fonts", name);
  const fontMedium = fs.readFileSync(getFontPath("NotoSansJP-Regular.ttf"));
  const fontBold = fs.readFileSync(getFontPath("NotoSansJP-Bold.ttf"));

  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "2rem 3rem",
        }}
      >
        <p style={{ fontSize: 90, fontWeight: 700 }}>{title}</p>
        <div style={{ fontSize: 45, fontWeight: 500 }}>{SITE_TITLE}</div>
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
          weight: 500,
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
