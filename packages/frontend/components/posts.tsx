import Pagination from "@/components/pagination";
import Post from "@/components/post";
import { PAGE_POST_LIMIT, Post as PostType } from "@boyaki/lib";
import { MicroCMSListResponse } from "microcms-js-sdk";

type Props = { result: MicroCMSListResponse<PostType> };
export default async function Posts({ result }: Props) {
  const { contents, totalCount, offset } = result;
  if (!contents || contents.length === 0) {
    return <h1>No contents</h1>;
  }

  return (
    <div>
      <div className="flex flex-col gap-8">
        {contents.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Pagination totalCount={totalCount} current={offset / PAGE_POST_LIMIT} />
    </div>
  );
}
