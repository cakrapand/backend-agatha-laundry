export interface IUserCredential {
  email: string;
  password: string;
}

export interface IUserProfile {
  name: string;
  address: string;
  userCredentialId: string;
}

export interface IService {
  name: string;
  price: number;
}

export interface IOrder {
  userCredentialId: string;
  serviceId: string;
}
