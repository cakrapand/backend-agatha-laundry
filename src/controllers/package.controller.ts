import { Request, Response, Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware";
import { getPackages } from "../services/package.service";

export const packageRouter = Router();

packageRouter.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const packages = await getPackages();
    return res.send(packages);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
