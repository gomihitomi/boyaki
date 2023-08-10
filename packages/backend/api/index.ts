import { getExample } from "@boyaki/lib";
import "dotenv/config";
import express from "express";
import { getPostDetail } from "./microcms";

const app = express();
const port = process.env.PORT ?? 3000;

app.get("/", (req, res) => {
  console.log(getExample());
  res.send("Express + TypeScript Server");
});

app.get("/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
