import { Request, Response, Router } from "express";
import { checkPassword, hashPassword } from "../helpers/hash";
import { generateToken } from "../helpers/token";
import {
  createUserCredential,
  createUserProfile,
  editUserProfileById,
  getUserCredentialByEmail,
  getUserProfileById,
  getUsers,
} from "../services/user.service";
import { authMiddleware } from "../middlewares/auth.middleware";
import validate from "../middlewares/validate.middleware";
import { loginUserSchema, registerUserSchema, updateProfileSchema } from "../schema/user.schema";
import log from "../utils/logger";

export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    return res.send(users);
  } catch (error: any) {
    log.info(error.message);
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/register", validate(registerUserSchema), async (req: Request, res: Response) => {
  try {
    const { email, password, name, address, phone } = req.body;

    if (await getUserCredentialByEmail(email))
      return res.status(409).json({ message: "email used" });

    const hashedPassword = await hashPassword(password);
    const newUser = await createUserCredential({ email, password: hashedPassword });
    if (!newUser) return res.status(400).json({ message: "create user fail" });

    const newProfile = await createUserProfile({
      address,
      name,
      userCredentialId: newUser.id,
      phone,
    });
    if (!newProfile) return res.status(400).json({ message: "create profile fail" });

    return res.status(201).json({ message: "user created" });
  } catch (error: any) {
    log.info(error.message);
    return res.status(500).json({ message: error.message });
  }
});

userRouter.post("/login", validate(loginUserSchema), async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userCredential = await getUserCredentialByEmail(email);

    if (!userCredential || !(await checkPassword(password, userCredential.password)))
      return res.status(401).json({ message: "Wrong email or password" });

    const token = generateToken({ id: userCredential.id, email: userCredential.email });
    return res.status(200).json({ id: userCredential.id, email: userCredential.email, token });
  } catch (error: any) {
    log.info(error.message);
    return res.status(500).json({ message: error.message });
  }
});

userRouter.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { currentUser } = res.locals;
    if (!currentUser) return res.status(400).json({ message: "Unauthorized" });

    const profile = await getUserProfileById(currentUser.id);
    if (!profile) return res.status(400).json({ message: "Profile not found" });

    return res.status(200).send(profile);
  } catch (error: any) {
    log.info(error.message);
    return res.status(500).json({ message: error.message });
  }
});

userRouter.patch(
  "/profile",
  authMiddleware,
  validate(updateProfileSchema),
  async (req: Request, res: Response) => {
    try {
      const { currentUser } = res.locals;
      if (!currentUser) return res.status(400).json({ message: "Unauthorized" });

      const { name, address, phone } = req.body;

      const profile = await getUserProfileById(currentUser.id);
      if (!profile) return res.status(400).json({ message: "Profile not found" });

      await editUserProfileById({
        name,
        address,
        userCredentialId: currentUser.id,
        phone,
      });

      return res.status(201).json({ message: "User updated" });
    } catch (error: any) {
      log.info(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
);
