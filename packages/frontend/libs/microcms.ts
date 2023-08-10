if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is required");
}

export type ApiComment = {
  fieldId: string;
  name: string;
  body: string;
};

export type ApiPostDetail = {
  like: number;
  comments: ApiComment[];
};

export const getApiPostDetail = async (slug: string) => {
  const result: ApiPostDetail = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}?slug=${slug}`)
  ).json();
  return result;
};

type PostRequest = {
  type: "like" | "comment";
  id: string;
  name?: string;
  body?: string;
};
export const postApiLikeOrPost = async (req: PostRequest) => {
  const result: ApiPostDetail = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    })
  ).json();
  return result;
};