import Link from 'next/link';
import { metadata } from './layout';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <h1>
          <>{metadata.title}</>
        </h1>
      </Link>
      <Link href="/links">リンク集</Link>
    </header>
  );
}
