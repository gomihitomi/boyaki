import { LINK_CLASSNAME } from "@libs/utils";
import Link from "next/link";

export default async function Header() {
  return (
    <header className="py-8">
      <Link href="/">
        <h1 className="text-3xl font-bold">吾味人美のぼやき</h1>
      </Link>
      <Link href="/link" className={`${LINK_CLASSNAME}`}>
        リンク集
      </Link>
    </header>
  );
}
