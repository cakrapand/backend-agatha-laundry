import { hashPassword } from "../src/helpers/hash";

export const generateUsers = async () => {
  const user1 = {
    name: "cakra",
    email: "cakrapand@gmail.com",
    password: await hashPassword("cakra"),
  };

  const user2 = {
    name: "budi",
    email: "budipand@gmail.com",
    password: await hashPassword("budi"),
  };

  return [user1, user2];
};

export const services = [
  {
    name: "biasa",
    price: 10000,
  },
  {
    name: "khusus",
    price: 15000,
  },
];
