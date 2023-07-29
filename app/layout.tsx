import Footer from "@components/footer";
import Header from "@components/header";
import type { Metadata } from "next";
import { BIZ_UDPGothic } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "吾味人美のぼやき",
  description: "Vtuber吾味人美のぼやきです。",
  viewport: { width: "device-width", initialScale: 1 },
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
    <html lang="jp">
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
