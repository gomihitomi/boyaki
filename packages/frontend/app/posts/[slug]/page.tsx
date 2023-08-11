import Post from "@/components/post";
import { writeOgpImage } from "@/libs/opengraphImage";
import { getSiteTitle, getSiteUrl } from "@/libs/utils";
import { getPostDetail, getPosts } from "@boyaki/lib";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { contents } = await getPosts({ limit: 1000 });

  await Promise.all(
    contents.map((post) => writeOgpImage(post.title, post.slug))
  );

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
  const { title } = posts.contents[0];
  const siteTitle = getSiteTitle(title);
  return {
    title: siteTitle,
    openGraph: {
      type: "article",
      url: getSiteUrl(slug),
      title: siteTitle,
      images: `ogps/${slug}.png`,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function StaticDetailPage({ params: { slug } }: Props) {
  const posts = await getPostDetail(slug);

  if (!posts || posts.totalCount !== 1) {
    notFound();
  }
  return <Post post={posts.contents[0]} isDetails />;
}
