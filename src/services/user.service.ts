// export const addUser = async (newUser: IUser) => {
//   const service = await insertUser(newUser);
//   return service;
// };

import { IUserCredential, IUserProfile } from "../interfaces/entitiy";
import {
  findUserCredentialByEmail,
  findUserProfileById,
  findUsers,
  insertUserCredential,
  insertUserProfile,
  updateUserProfileById,
} from "../repositories/user.repository";

export const getUsers = async () => {
  return await findUsers();
};

export const getUserCredentialByEmail = async (email: string) => {
  return await findUserCredentialByEmail(email);
};

export const createUserCredential = async (newUserCredential: IUserCredential) => {
  return await insertUserCredential(newUserCredential);
};

export const createUserProfile = async (newUserProfile: IUserProfile) => {
  return await insertUserProfile(newUserProfile);
};

export const getUserProfileById = async (credentialId: string) => {
  return await findUserProfileById(credentialId);
};

export const editUserProfileById = async (newUserProfile: IUserProfile) => {
  return await updateUserProfileById(newUserProfile);
};

// export const getUserCredentials = async () => {
//   return await findUserCredentials();
// };

// export const getUserProfiles = async () => {
//   return await findUserProfiles();
// };

// export const getUserByEmail = async (email: string) => {
//   return await findUserByEmail(email);
// };

// export const getUserById = async (id: string) => {
//   return await findUserById(id);
// };

// export const editUserById = async () => {};

// export const deleteUserById = async () => {};
