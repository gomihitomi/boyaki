import { getEndPage, range } from "@boyaki/lib";
import Link from "next/link";

const RANGE_SIZE = 5;

const getEllipsisRange = (end: number, current: number) => {
  const generateRange = () => {
    const allRange = range(1, end);
    if (end <= RANGE_SIZE) {
      return allRange;
    }

    const currentRange = allRange.slice(Math.max(current - 1, 0), current + 2);
    if (currentRange.includes(2)) {
      return [...allRange.slice(0, RANGE_SIZE), -1, end];
    }
    if (currentRange.includes(end - 1)) {
      return [1, -1, ...allRange.slice(end - RANGE_SIZE, end)];
    }
    return [1, -1, ...currentRange, -1, end];
  };
  return generateRange().map((number) => ({
    number,
    type:
      number - 1 == current ? "current" : number === -1 ? "ellipsis" : "number",
  }));
};

type Props = { current: number; totalCount: number };
export default async function Pagination({ current, totalCount }: Props) {
  const end = getEndPage(totalCount);
  if (end < 2) {
    return <></>;
  }
  return (
    <ul className="flex my-6 gap-2 justify-center flex-wrap">
      {getEllipsisRange(end, current).map(({ number, type }) => (
        <li key={number} className="font-bold">
          {type === "current" && (
            <span className="w-8 h-8 bg-white border border-black border-dotted grid place-content-center rounded-full">
              {number}
            </span>
          )}
          {type === "ellipsis" && (
            <span className="w-8 h-8 bg-white grid place-content-center">
              …
            </span>
          )}
          {type === "number" && (
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
