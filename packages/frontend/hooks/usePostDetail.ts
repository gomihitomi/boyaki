import { Post } from "@boyaki/lib";
import { useEffect, useState } from "react";

export function usePostDetail(slug: string) {
  const [postDetail, setPostDetail] = useState<Post>();

  useEffect(() => {
    const run = async () => {
      // const posts = await getPostDetail(slug);
      // if (!!posts && posts.totalCount === 0) {
      //   setPostDetail(posts.contents[0]);
      // }
    };
    run();
  }, [slug]);

  return {
    postDetail,
  };
}
