import { IUserCredential, IUserProfile } from "../interfaces/entitiy";
import prisma from "../utils/db.server";

export const findUsers = async () => {
  return await prisma.userCredential.findMany({
    include: {
      userProfile: true,
    },
  });
};

export const findUserCredentialByEmail = async (email: string) => {
  return await prisma.userCredential.findUnique({ where: { email: email } });
};

export const insertUserCredential = async (newUser: IUserCredential) => {
  return await prisma.userCredential.create({ data: newUser });
};

export const insertUserProfile = async (newProfile: IUserProfile) => {
  return await prisma.userProfile.create({ data: newProfile });
};

export const findUserProfileById = async (credentialId: string) => {
  return await prisma.userProfile.findUnique({ where: { userCredentialId: credentialId } });
};

export const updateUserProfileById = async ({ name, address, userCredentialId }: IUserProfile) => {
  return await prisma.userProfile.update({
    where: {
      userCredentialId: userCredentialId,
    },
    data: {
      name,
      address,
    },
  });
};

// export const findUserCredentials = async () => {
//   return await prisma.userCredential.findMany();
// };

// export const findUserProfiles = async () => {
//   return await prisma.userProfile.findMany();
// };

// export const findUserByEmail = async (email: string) => {
//   return await prisma.user.findUnique({ where: { email: email } });
// };

// export const findUserById = async (id: string) => {
//   return await prisma.user.findUnique({ where: { id: id } });
// };

// export const updateUser = async () => {};

// export const deleteUser = async () => {};
