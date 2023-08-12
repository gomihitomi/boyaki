import Posts from "@/components/posts";
import { writeOgpImage } from "@/libs/opengraphImage";
import { getSiteTitle } from "@/libs/utils";
import { getPosts } from "@boyaki/lib";

export default async function StaticPage() {
  await writeOgpImage({ title: getSiteTitle() });

  const result = await getPosts();
  return <Posts result={result} />;
}
