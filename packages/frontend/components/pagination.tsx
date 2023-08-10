import { getEndPage, range } from "@boyaki/lib";
import Link from "next/link";

type Props = { current: number; totalCount: number };
export default async function Pagination({ current, totalCount }: Props) {
  const end = getEndPage(totalCount);
  if (end < 2) {
    return <></>;
  }

  return (
    <ul className="flex my-4 gap-2 justify-center">
      {range(1, end).map((number, index) => (
        <li key={index} className="font-bold">
          {index === current ? (
            <span className="w-8 h-8 bg-white border border-black border-dotted grid place-content-center rounded-full">
              {number}
            </span>
          ) : (
            <Link
              href={`/pages/${number}`}
              className="w-8 h-8 bg-emerald-700 text-white grid place-content-center rounded-full"
            >
              {number}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
