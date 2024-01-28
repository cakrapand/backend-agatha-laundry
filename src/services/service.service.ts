import { Service } from "@prisma/client";
import { findServiceById, findServices, insertService } from "../repository/service.repository";

export const addService = async (newService: Service) => {
  const service = await insertService(newService);
  return service;
};

export const getServices = async () => {
  return await findServices();
};

export const getServiceById = async (serviceId: string) => {
  return await findServiceById(serviceId);
};

export const editServiceById = async () => {};

export const deleteServiceById = async () => {};
