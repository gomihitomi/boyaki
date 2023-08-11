import { postApiLikeOrPost } from "@/libs/api";
import { Post } from "@boyaki/lib";
import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY_DARK_MODE = "gomihitomi.boyaki.localstorage";

type BoyakiStorage = {
  slug: string;
  hasLike: boolean;
};

export function useBoyakiStorage(post: Post) {
  const { slug } = post;
  const [boyakiStorage, setBoyakiStorage] = useState<BoyakiStorage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const strorage = localStorage.getItem(STORAGE_KEY_DARK_MODE);
    if (!strorage) {
      localStorage.setItem(STORAGE_KEY_DARK_MODE, "[]");
    }
    setBoyakiStorage(!strorage ? [] : JSON.parse(strorage));
    setIsLoading(false);
  }, []);

  const setUpdateBoyakiStorage = useCallback((storage: BoyakiStorage[]) => {
    setBoyakiStorage(storage);
    localStorage.setItem(STORAGE_KEY_DARK_MODE, JSON.stringify(storage));
  }, []);

  const hasLike = useMemo(
    () => boyakiStorage.find((v) => v.slug === slug)?.hasLike ?? false,
    [boyakiStorage, slug]
  );

  const onLike = async () => {
    const value = boyakiStorage.filter((v) => v.slug !== slug);
    setUpdateBoyakiStorage([...value, { slug, hasLike: !hasLike }]);
    const result = await postApiLikeOrPost({ type: "like", id: post.id });
    return result;
  };

  return {
    boyakiStorage,
    setBoyakiStorage: setUpdateBoyakiStorage,
    hasLike,
    onLike,
    isLoading,
  };
}
