import { sign, verify } from "jsonwebtoken";
import { ITokenPayload } from "../interfaces/response";

const secretToken = process.env.ACCESS_TOKEN_SECRET;

export const generateToken = (data: ITokenPayload) => {
  if (!secretToken) throw Error("Secret token not set");
  return sign(data, secretToken);
  // return sign(data, secretToken, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  if (!secretToken) throw Error("Secret token not set");
  return verify(token, secretToken);
};
