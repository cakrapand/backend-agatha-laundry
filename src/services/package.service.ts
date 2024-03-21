import { findPackage, findPackageById } from "../repositories/package.repository";

export const getPackages = async () => {
  return await findPackage();
};

export const getPackageId = async (packageId: string) => {
  return await findPackageById(packageId);
};
