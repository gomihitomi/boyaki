import type { Metadata } from 'next';
import Footer from './footer';
import './globals.css';
import Header from './header';
import Main from './main';

export const metadata: Metadata = {
  title: '吾味人美のぼやき',
  description: '頑張らない程度に頑張るVtuber吾味人美のぼやきです。',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head />
      <body>
        <div className="container">
          <Header />
          <Main>{children}</Main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
