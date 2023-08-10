import type {
  MicroCMSContentId,
  MicroCMSDate,
  MicroCMSImage,
  MicroCMSQueries,
} from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

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

export const getPostDetail = async (slug: string) => {
  const queries: MicroCMSQueries = { limit: 1, filters: `slug[equals]${slug}` };
  const result = await client.getList<Post>({
    endpoint: "posts",
    queries,
  });
  return result;
};
