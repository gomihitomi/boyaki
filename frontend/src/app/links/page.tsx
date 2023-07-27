import Link from 'next/link';

export default function Links() {
  return (
    <>
      <p>
        <Link href="https://note.com/jo2peg" target="_blank">
          穣津ペグ(Note)
        </Link>
        <span> 管理人コメント: オススメ！！</span>
      </p>
      <p>
        <Link
          href="https://shirase-chan.github.io/shirase-shan.github.io/"
          target="_blank"
        >
          しらせ★ちゃんねる
        </Link>
        <span> 管理人コメント: オススメ！！</span>
      </p>
    </>
  );
}
