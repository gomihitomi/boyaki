import "dotenv/config";
import express from "express";
import router from "./route";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at PORT:${port}`);
});
