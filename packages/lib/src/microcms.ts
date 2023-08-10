import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
} from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import { PAGE_POST_LIMIT } from "./utils";

type MicroCMSType = MicroCMSContentId & MicroCMSDate;

export type Comment = {
  fieldId: string;
  name: string;
  body: string;
};

export type Post = {
  slug: string;
  title: string;
  body: string;
  image?: MicroCMSImage;
  like?: number;
  comments?: Comment[];
} & MicroCMSType;

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export const getPosts = async (queries?: MicroCMSQueries) => {
  const result = await client.getList<Post>({
    endpoint: "posts",
    queries: { limit: PAGE_POST_LIMIT, orders: "-publishedAt", ...queries },
  });
  return result;
};

export const getPostDetail = async (slug: string) => {
  const queries: MicroCMSQueries = { limit: 1, filters: `slug[equals]${slug}` };
  const result = await client.getList<Post>({
    endpoint: "posts",
    queries,
  });
  return result;
};

export const updatePostLike = async (id: string) => {
  const result = await client.getListDetail<Post>({
    endpoint: "posts",
    contentId: id,
  });
  if (!result) {
    console.warn("not id: " + id);
    return;
  }
  const like = (result.like ?? 0) + 1;
  await client.update({
    endpoint: "posts",
    contentId: id,
    content: {
      like,
    },
  });
  const updatedResult = await client.getListDetail<Post>({
    endpoint: "posts",
    contentId: id,
  });
  return {
    like: updatedResult.like ?? 0,
    comments: updatedResult.comments ?? [],
  };
};
