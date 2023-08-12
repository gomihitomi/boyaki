/* eslint-disable @next/next/no-img-element */
import fs from "fs";
import path from "path";
import satori from "satori";
import sharp from "sharp";
import { SITE_TITLE } from "./constants";
import { getSiteUrl } from "./utils";

type Props = {
  title: string;
  slug?: string;
  imageUrl?: string;
};
export const writeOgpImage = async (props: Props) => {
  const imagePath = path.join("public", "ogps");
  if (!fs.existsSync(imagePath)) fs.mkdirSync(imagePath, { recursive: true });

  const image = await generateOgpImage(props);
  fs.writeFileSync(path.join(imagePath, `${props.slug ?? "base"}.png`), image);
};

const generateOgpImage = async ({ title, slug, imageUrl }: Props) => {
  const getFontPath = (name: string) => path.join("assets", "fonts", name);
  const fontMedium = fs.readFileSync(getFontPath("NotoSansJP-Regular.ttf"));
  const fontBold = fs.readFileSync(getFontPath("NotoSansJP-Bold.ttf"));

  // base : SITE_URL
  // !base: SITETITLE - SITE_URL
  const url = `${slug ? SITE_TITLE + " - " : ""}${getSiteUrl(slug)}`;

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
            borderRadius: "8px",
            padding: "24px",
            backgroundColor: "#fff",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "75px",
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1,
            }}
          >
            {title}
          </span>
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
