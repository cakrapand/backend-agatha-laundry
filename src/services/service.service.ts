import { Service } from "@prisma/client";
import { findServiceById, findServices } from "../repositories/service.repository";

export const addService = async (newService: Service) => {};

export const getServices = async () => {
  return await findServices();
};

export const getServiceById = async (packageOnServiceId: string) => {
  return await findServiceById(packageOnServiceId);
};

export const editServiceById = async () => {};

export const deleteServiceById = async () => {};
