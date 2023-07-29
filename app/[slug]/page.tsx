import Post from "@components/post";
import { getPostDetail, getPosts } from "@libs/microcms";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { contents } = await getPosts();

  const paths = contents.map((post) => ({ slug: post.slug }));
  return [...paths];
}

export default async function StaticDetailPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const posts = await getPostDetail(slug);

  if (!posts || posts.totalCount !== 1) {
    notFound();
  }
  return <Post post={posts.contents[0]} isDetails />;
}
