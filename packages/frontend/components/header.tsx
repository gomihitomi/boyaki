import { LINK_CLASSNAME } from "@/libs/constants";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="py-8">
      <Link href="/">
        <h1 className="text-3xl font-bold">吾味人美のぼやき</h1>
      </Link>
      <div className="text-sm mb-2 font-bold">大体0時前後に更新中。</div>
      <Link href="/links" className={`${LINK_CLASSNAME}`}>
        リンク集
      </Link>
    </header>
  );
}
