export interface IUserCredential {
  email: string;
  password: string;
}

export interface IUserProfile {
  name: string;
  address: string;
  phone: string;
  userCredentialId: string;
}

export interface IService {
  name: string;
  price: number;
}

export interface IOrder {
  // id: string;
  userCredentialId: string;
  // redirectUrl: string;
  // amount: number;
}

export interface IOrderDetail {
  orderId: string;
  packageOnServiceId: string;
  // quantity: number;
}

export interface ITransaction {
  orderId: string;
  amount: number;
}
