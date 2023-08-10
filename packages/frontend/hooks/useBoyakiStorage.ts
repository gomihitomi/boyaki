import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY_DARK_MODE = "gomihitomi.boyaki.localstorage";

type BoyakiStorage = {
  slug: string;
  hasLike: boolean;
};

export function useBoyakiStorage(slug: string) {
  const [boyakiStorage, setBoyakiStorage] = useState<BoyakiStorage[]>([]);

  useEffect(() => {
    const strorage = localStorage.getItem(STORAGE_KEY_DARK_MODE);
    if (!strorage) {
      localStorage.setItem(STORAGE_KEY_DARK_MODE, "[]");
    }
    setBoyakiStorage(!strorage ? [] : JSON.parse(strorage));
  }, []);

  const setUpdateBoyakiStorage = useCallback((storage: BoyakiStorage[]) => {
    setBoyakiStorage(storage);
    localStorage.setItem(STORAGE_KEY_DARK_MODE, JSON.stringify(storage));
  }, []);

  const hasLike = useMemo(
    () => boyakiStorage.find((v) => v.slug === slug)?.hasLike ?? false,
    [boyakiStorage, slug]
  );

  const onLike = () => {
    const value = boyakiStorage.filter((v) => v.slug !== slug);
    // TODO: 終わったらプッシュ
    // setUpdateBoyakiStorage([...value, { slug, hasLike: !hasLike }]);
  };

  return {
    boyakiStorage,
    setBoyakiStorage: setUpdateBoyakiStorage,
    hasLike,
    onLike,
  };
}
