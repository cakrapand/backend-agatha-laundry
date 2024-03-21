import prisma from "../utils/db.server";
import { Service } from "@prisma/client";

export const insertService = async (newService: Service) => {};

export const findServices = async () => {
  return await prisma.packageOnService.findMany({
    include: {
      package: true,
      service: true,
    },
  });
};

export const findServiceById = async (packageOnServiceId: string) => {
  return await prisma.packageOnService.findUnique({
    where: { id: packageOnServiceId },
    include: {
      package: true,
      service: true,
    },
  });
};

export const updateService = async () => {};

export const deleteService = async () => {};
