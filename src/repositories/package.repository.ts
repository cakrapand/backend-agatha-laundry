import prisma from "../utils/db.server";

export const findPackage = async () => {
  return await prisma.package.findMany();
};

export const findPackageById = async (packageId: string) => {
  return await prisma.packageOnService.findUnique({
    where: { id: packageId },
  });
};
