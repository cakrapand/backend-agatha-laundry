import { IUser } from "../interfaces/entitiy";
import { findUserByEmail, findUsers, insertUser } from "../repository/user.repository";

export const addUser = async (newUser: IUser) => {
  const service = await insertUser(newUser);
  return service;
};

export const getUsers = async () => {
  return await findUsers();
};

export const getUserByEmail = async (email: string) => {
  return await findUserByEmail(email);
};

// export const getUserById = async (id: string) => {
//   return await findUserById(usedId);
// };

// export const editUserById = async () => {};

// export const deleteUserById = async () => {};
