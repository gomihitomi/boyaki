import { ApiPostDetail, getApiPostDetail } from "@/libs/microcms";
import { useEffect, useState } from "react";

export function usePostDetail(slug: string) {
  const [postDetail, setPostDetail] = useState<ApiPostDetail>();

  useEffect(() => {
    const run = async () => {
      const postDetail = await getApiPostDetail(slug);
      setPostDetail(postDetail);
    };
    run();
  }, [slug]);

  return {
    postDetail,
    setPostDetail,
  };
}
