import express, { Request, Response, Express } from "express";
import appRouter from "./routes";
import cors from "cors";

const app: Express = express();
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:4200",
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.use(appRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
