import Post from "@components/post";
import { getPosts } from "@libs/microcms";

export default async function StaticPage() {
  const { contents } = await getPosts();

  if (!contents || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div className="flex flex-col gap-4">
      {contents.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
