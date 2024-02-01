import { Request, Response, Router } from "express";
import { createOrder, getOrderById, getOrders } from "../services/order.service";
import { send } from "process";
import { getServiceById } from "../services/service.service";

export const orderRouter = Router();

orderRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { currentUser } = res.locals;
    const services = await getOrderById(currentUser.id);
    return res.send(services);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

orderRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.body;
    const { currentUser } = res.locals;

    if (!(await getServiceById(serviceId)))
      return res.status(400).json({ message: "Empty or invalid input" });

    await createOrder({ serviceId, userCredentialId: currentUser.id });
    return res.status(201).json({ message: "Order created" });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});
