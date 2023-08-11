import Posts from "@/components/posts";
import { writeOgpImage } from "@/libs/opengraphImage";
import { getPosts } from "@boyaki/lib";

export default async function StaticPage() {
  await writeOgpImage("吾味人美のぼやき");

  const result = await getPosts();
  return <Posts result={result} />;
}
