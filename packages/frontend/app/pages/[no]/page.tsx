import Posts from "@/components/posts";
import { PAGE_POST_LIMIT, getPosts, range } from "@boyaki/lib";

export async function generateStaticParams() {
  const { totalCount } = await getPosts({ limit: 0 });
  const end = Math.ceil(totalCount / PAGE_POST_LIMIT);

  const paths = range(1, end).map((no) => ({ no: String(no) }));
  return [...paths];
}

export default async function StaticNoPage({
  params: { no },
}: {
  params: { no: string };
}) {
  const result = await getPosts({ offset: (Number(no) - 1) * PAGE_POST_LIMIT });
  return <Posts result={result} />;
}
