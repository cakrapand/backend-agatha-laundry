import { Router } from "express";
import type { Request, Response } from "express";
import { getServiceById, getServices } from "./services.service";

export const serviceRouter = Router();

serviceRouter.get("/", async (req: Request, res: Response) => {
  try {
    const services = await getServices();
    return res.send(services);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

serviceRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const service = await getServiceById(id);
    if (service) return res.status(200).json(service);
    return res.status(404).json("Service not found");
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
