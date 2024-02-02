import { IUserProfile } from "../interfaces/entitiy";
import { IMidtransCharge } from "../interfaces/response";

const clientKey = process.env.MIDTRANS_CLIENT_KEY as string;
const serverKey = process.env.MIDTRANS_SERVER_KEY as string;

export const charge = async (chargeData: IMidtransCharge) => {
  return await fetch("https://app.sandbox.midtrans.com/snap/v1/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Basic ${Buffer.from(serverKey).toString("base64")}`,
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: chargeData.order_id,
        gross_amount: chargeData.gross_amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: chargeData.name,
        email: chargeData.email,
        phone: chargeData.phone,
        address: chargeData.address,
      },
    }),
  });
};
