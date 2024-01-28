import prisma from "../utils/db.server";
import { Service } from "@prisma/client";

export const insertService = async (newService: Service) => {
  const service = await prisma.service.create({ data: newService });

  return service;
};

export const findServices = async () => {
  return await prisma.service.findMany();
};

export const findServiceById = async (serviceId: string) => {
  return await prisma.service.findUnique({ where: { id: serviceId } });
};

export const updateService = async () => {};

export const deleteService = async () => {};
