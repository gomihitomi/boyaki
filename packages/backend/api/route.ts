import { getPostDetail, updatePostLike } from "@boyaki/lib";
import * as Express from "express";
const router = Express.Router();

router.get("/", async (req, res) => {
  const slug = req.query.slug;
  if (!slug || slug === "favicon.ico") {
    return res.send("");
  }
  const detail = await getPostDetail(slug as string);
  if (detail.contents.length !== 1) {
    console.warn(`slug: ${slug as string} のコンテンツ件数が1件以外です。`);
    res.status(500);
    res.send({ like: 0, comments: [] });
    return;
  }
  const { like, comments } = detail.contents[0];
  res.send({ like: like ?? 0, comments: comments ?? [] });
});

type PostRequest = {
  type: "like" | "comment";
  id: string;
  slug: string;
  name?: string;
  body?: string;
};
router.post("/", async (req, res) => {
  const request: PostRequest = req.body;
  console.log(request);
  if (request.type === "like") {
    const likeResult = await updatePostLike(request.id);
    res.send(likeResult);
    return;
  } else if (request.type === "comment") {
    // updatePostComment(request.id, request.name, request.body);
  }
  res.send({ message: "no type" });
});

export default router;
