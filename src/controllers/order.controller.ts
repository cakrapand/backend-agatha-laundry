import { Request, Response, Router } from "express";
import {
  createOrder,
  createOrderDetail,
  editOrderStatusById,
  getOrders,
  getOrdersById,
} from "../services/order.service";
import { getServiceById } from "../services/service.service";
import { getUserProfileById } from "../services/user.service";
import { charge } from "../helpers/midtrans";
import { createTransaction, editTransactionStatusById } from "../services/transaction.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { createOrderSchema } from "../schema/order.schema";
import { IOrderDetail } from "../interfaces/entitiy";

export const orderRouter = Router();

orderRouter.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { currentUser } = res.locals;
    const services = await getOrdersById(currentUser.id);
    return res.send(services);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
});

orderRouter.post(
  "/",
  authMiddleware,
  validate(createOrderSchema),
  async (req: Request, res: Response) => {
    try {
      const { orderDetails } = req.body;

      const { currentUser } = res.locals;
      const userProfile = await getUserProfileById(currentUser.id);
      if (!userProfile) return res.status(400).json({ message: "User not found" });

      // let total = 0;
      for (const orderDetail of orderDetails) {
        const packageOnService = await getServiceById(orderDetail.packageOnServiceId);
        if (!packageOnService) return res.status(404).json({ message: "Service not found" });
        // else total += packageOnService.price * +orderDetail.quantity;
      }

      // const orderId = "order-csb-" + "" + Math.round(new Date().getTime() / 1000);
      // const response = await charge({
      //   order_id: orderId,
      //   gross_amount: total,
      //   name: userProfile.name,
      //   email: currentUser.email,
      //   phone: userProfile.phone,
      //   address: userProfile.address,
      // });
      // if (!response.ok) res.status(response.status).json({ message: response.statusText });
      // const snapToken = await response.json();

      const order = await createOrder({
        userCredentialId: currentUser.id,
        // redirectUrl: snapToken.redirect_url,
        // amount: total,
      });

      for (const orderDetail of orderDetails) {
        await createOrderDetail({
          orderId: order.id,
          packageOnServiceId: orderDetail.packageOnServiceId,
          // quantity: +orderDetail.quantity,
        });
      }

      return res.status(201).json({ message: "Order Success" });
    } catch (error: any) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// orderRouter.post("/handling", async (req: Request, res: Response) => {
//   try {
//     const { order_id, transaction_status, fraud_status, gross_amount } = req.body;
//     if (transaction_status == "capture") {
//       if (fraud_status == "accept") {
//         await editTransactionStatusById(order_id, "SUCCESS");
//         await editOrderStatusById(order_id, "PICKED_UP");
//         return res.status(200).json({ message: "OK" });
//       }
//     } else if (transaction_status == "settlement") {
//       await editTransactionStatusById(order_id, "SUCCESS");
//       await editOrderStatusById(order_id, "PICKED_UP");
//       return res.status(200).json({ message: "OK" });
//     } else if (
//       transaction_status == "cancel" ||
//       transaction_status == "deny" ||
//       transaction_status == "expire"
//     ) {
//       await editTransactionStatusById(order_id, "FAILURE");
//       await editOrderStatusById(order_id, "CANCEL");
//       return res.status(200).json({ message: "OK" });
//     } else if (transaction_status == "pending") {
//       await createTransaction({ orderId: order_id, amount: +gross_amount });
//       return res.status(200).json({ message: "OK" });
//     }
//   } catch (error: any) {
//     return res.status(500).json(error.message);
//   }
// });
