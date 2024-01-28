import { Request, Response, Router } from "express";
import { addUser, getUserByEmail, getUsers } from "../services/user.service";
import { checkPassword, hashPassword } from "../helpers/hash";
import { generateToken } from "../helpers/token";

export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ message: "Input invalid or empty" });

    if (await getUserByEmail(email)) return res.status(400).json({ message: "email used" });

    const hashedPassword = await hashPassword(password);
    const newUser = await addUser({ email, password: hashedPassword, name });
    if (!newUser) return res.status(400).json({ message: "create user fail" });

    return res.status(201).json({ message: "user created" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Input invalid or empty" });

    const user = await getUserByEmail(email);

    if (!user) return res.status(400).json({ message: "Wrong email or password" });

    if (!(await checkPassword(password, user.password)))
      return res.status(400).json({ message: "Wrong email or password" });

    const token = generateToken({ uuid: user.id, email: user.email });
    return res.status(200).json({ uuid: user.id, token });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});
