import { compare, genSalt, hash } from "bcrypt";

export const hashPassword = async (value: string) => {
  const salt = await genSalt(10);
  return await hash(value, salt);
};

export const checkPassword = async (value: string, encrypted: string) => {
  return await compare(value, encrypted);
};
