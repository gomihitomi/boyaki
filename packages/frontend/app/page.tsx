import Posts from "@/components/posts";
import { getPosts } from "@boyaki/lib";

export default async function StaticPage() {
  const result = await getPosts();
  return <Posts result={result} />;
}
