import Link from "next/link";

type Link = {
  url: string;
  name: string;
};
const LINKS: Link[] = [
  { url: "https://note.com/jo2peg/", name: "穣津ペグ(Note)" },
  {
    url: "https://shirase-chan.github.io/shirase-shan.github.io/",
    name: "しらせ★ちゃんねる",
  },
];

export default async function StaticPage() {
  return (
    <div className="flex flex-col gap-2">
      {LINKS.map((link, i) => (
        <div key={i}>
          <Link href={link.url} className="text-emerald-600 font-bold">
            {link.name}
          </Link>
          <div>管理人コメント: オススメ！！</div>
        </div>
      ))}
    </div>
  );
}
