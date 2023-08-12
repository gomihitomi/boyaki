import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ぼやき is 何",
};

export default async function StaticPage() {
  return (
    <div className="flex flex-col gap-4 leading-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">ぼやき is 何</h3>
        <p>
          バーチャルインターネットラクガキマンの吾味人美がTwitterの名前がXになった時、何か怖～いと思って作った個人サイトです。
          個人サイトという体ですが、実質ブログです。毎日0時前後に更新したりしなかったりしています。
        </p>
        <p>このサイトではかなり個人的なことばかり書く予定です。</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold">あなたは誰</h3>
        <p>
          吾味人美です。俗に言うVtuberです、絵とか曲とか動画を作ります。あんまり活動出来ていません。
        </p>
      </div>
    </div>
  );
}
