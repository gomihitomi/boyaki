import { getPostDetail } from "@boyaki/lib";
import * as Express from "express";
const router = Express.Router();

router.get("/", (req, res) => {
  res.send("boyaki api.");
});

router.get("/:id", async (req, res) => {
  const slug = req.params.id;
  if (slug === "favicon.ico") {
    return res.send("");
  }
  const detail = await getPostDetail(req.params.id);
  if (detail.contents.length !== 1) {
    console.warn(`slug: ${req.params.id} のコンテンツ件数が1件以外です。`);
    res.status(500);
    res.send({ like: 0, comments: [] });
    return;
  }
  const { like, comments } = detail.contents[0];
  res.send({ like: like ?? 0, comments: comments ?? [] });
});

export default router;
