import { getPostDetail, updatePostComment, updatePostLike } from "@boyaki/lib";
import * as Express from "express";
const router = Express.Router();

router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.CORS}`);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTION,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  next();
});

router.options("*", function (req, res) {
  res.sendStatus(200);
});

router.get("/", async (req, res) => {
  const slug = req.query.slug;
  if (!slug || slug === "favicon.ico") {
    res.send("");
    return;
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
  if (request.type === "like") {
    const likeResult = await updatePostLike(request.id);
    res.send(likeResult);
    return;
  } else if (request.type === "comment") {
    const commentResult = await updatePostComment(
      request.id,
      request.name?.substring(0, 100) ?? "",
      request.body?.substring(0, 1000) ?? ""
    );
    res.send(commentResult);
    return;
  }
  res.send({ message: "no type" });
});

export default router;
