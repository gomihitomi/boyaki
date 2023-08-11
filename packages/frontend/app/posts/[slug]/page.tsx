import Post from "@/components/post";
import { getPostDetail, getPosts } from "@boyaki/lib";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { contents } = await getPosts({ limit: 1000 });

  const paths = contents.map((post) => ({ slug: post.slug }));
  return [...paths];
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const posts = await getPostDetail(slug);
  if (!posts || posts.totalCount !== 1) {
    notFound();
  }
  return {
    title: posts.contents[0].title,
  };
}

export default async function StaticDetailPage({ params: { slug } }: Props) {
  const posts = await getPostDetail(slug);

  if (!posts || posts.totalCount !== 1) {
    notFound();
  }
  return <Post post={posts.contents[0]} isDetails />;
}
