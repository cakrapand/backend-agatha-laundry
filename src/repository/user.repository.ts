import { IUser } from "../interfaces/entitiy";
import prisma from "../utils/db.server";

export const insertUser = async (newUser: IUser) => {
  const user = await prisma.user.create({ data: newUser });
  return user;
};

export const findUsers = async () => {
  return await prisma.user.findMany();
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({ where: { email: email } });
};

// export const findServiceById = async (serviceId: string) => {
//   return await prisma.service.findUnique({ where: { id: serviceId } });
// };

// export const updateUser = async () => {};

// export const deleteUser = async () => {};
