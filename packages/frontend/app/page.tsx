import Posts from "@components/posts";
import { getPosts } from "@libs/microcms";

export default async function StaticPage() {
  const result = await getPosts();
  return <Posts result={result} />;
}
