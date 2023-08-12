import Post from "@/components/post";
import { writeOgpImage } from "@/libs/opengraphImage";
import { bodyToDescription, getSiteTitle, getSiteUrl } from "@/libs/utils";
import { getPostDetail, getPosts } from "@boyaki/lib";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { contents } = await getPosts({ limit: 1000 });

  // devで動かしてる時も画像出力すると時間が掛かるのでページ毎のOGPは省略
  if (process.env.NODE_ENV !== "development") {
    await Promise.all(
      contents.map((post) =>
        writeOgpImage({
          title: post.title,
          slug: post.slug,
          imageUrl: post.image?.url,
        })
      )
    );
  }

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
  const { title, body } = posts.contents[0];

  const siteTitle = getSiteTitle(title);
  const description = bodyToDescription(body);

  return {
    title: siteTitle,
    description,
    openGraph: {
      type: "article",
      url: getSiteUrl(slug),
      title: siteTitle,
      images: `ogps/${slug}.png`,
      description,
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
