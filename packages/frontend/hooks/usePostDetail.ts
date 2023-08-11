import { getApiPostDetail } from "@/libs/api";
import { ApiPostDetailResponse } from "@boyaki/lib";
import { useEffect, useState } from "react";

export function usePostDetail(slug: string) {
  const [postDetail, setPostDetail] = useState<ApiPostDetailResponse>();

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
