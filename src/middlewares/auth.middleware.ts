import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/token";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;

    if (!header) throw new Error("authorization required");

    const token = header.split(" ")[1];
    verifyToken(token);

    next();
  } catch (error: any) {
    let code;
    if (error.message) {
      if (error.message.includes("jwt malformed")) {
        code = 404;
      }
      if (error.message.includes("authorization required")) {
        code = 401;
      }
      if (error.message.includes("jwt expired")) {
        code = 403;
      }
      if (error.message.includes("invalid token")) {
        code = 406;
      }
      if (error.message.includes("jwt must be provided")) {
        code = 401;
      }
    }

    res.status(code ? (code as number) : 400).json({ message: error.message });
  }
};
