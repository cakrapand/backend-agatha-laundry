import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { serviceRouter } from "./controllers/service.controller";
import { userRouter } from "./controllers/user.controller";
import { authMiddleware } from "./middlewares/auth.middleware";
import { orderRouter } from "./controllers/order.controller";
import { charge } from "./helpers/midtrans";
import { getUserProfileById } from "./services/user.service";
import prisma from "./utils/db.server";

dotenv.configDotenv();

if (!process.env.PORT) process.exit(1);

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/services", authMiddleware, serviceRouter);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
