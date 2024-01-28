import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { serviceRouter } from "./service/service.controller";

dotenv.configDotenv();

if (!process.env.PORT) process.exit(1);

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/services", serviceRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
