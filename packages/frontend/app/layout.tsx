import Footer from "@/components/footer";
import Header from "@/components/header";
import { SITE_TITLE } from "@/libs/constants";
import { getSiteUrl } from "@/libs/utils";
import type { Metadata } from "next";
import { BIZ_UDPGothic } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? ""),
  title: { default: SITE_TITLE, template: `%s｜${SITE_TITLE}` },
  description: "Vtuber吾味人美のぼやきです。",
  viewport: { width: "device-width", initialScale: 1 },
  openGraph: {
    type: "website",
    url: getSiteUrl(),
    title: SITE_TITLE,
    images: `ogps/base.png`,
  },
  twitter: {
    card: "summary_large_image",
  },
};
const font = BIZ_UDPGothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={font.className}>
        <div className="mx-auto max-w-screen-md p-4">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
