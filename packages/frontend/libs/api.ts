import { ApiPostDetailResponse, ApiPostRequest } from "@boyaki/lib";

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is required");
}

export const getApiPostDetail = async (slug: string) => {
  const result: ApiPostDetailResponse = await (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}?slug=${slug}`)
  ).json();
  return result;
};

export const postApiLikeOrPost = async (req: ApiPostRequest) => {
  const result: ApiPostDetailResponse = await (
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
